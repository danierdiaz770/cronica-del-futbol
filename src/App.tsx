import { useCallback, useEffect, useState } from 'react';
import {
  FOOTBALL_HISTORY,
  type EraFilter,
  type GameMode,
  type HistoryEntry,
} from './data/footballHistory';
import { TopBar, type ActiveView } from './components/TopBar';
import { TitleMenu } from './components/TitleMenu';
import { GameBoard, type RoundRecord } from './components/GameBoard';
import { ArchiveView } from './components/ArchiveView';
import { RulesView } from './components/RulesView';
import { soundFX } from './utils/sound';

const MAX_WRONG = 6;
const CUP_ROUNDS = 5;
const STORAGE_UNLOCKED_KEY = 'cronica_futbol_unlocked_v1';
const STORAGE_BEST_SCORE_KEY = 'cronica_futbol_best_score_v1';

type PlayPhase = 'PLAYING' | 'ROUND_SUMMARY' | 'GAME_OVER';

function shuffleEntries(entries: HistoryEntry[]): HistoryEntry[] {
  const copy = [...entries];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeSpanishKey(rawKey: string): string | null {
  const upper = rawKey.toUpperCase();
  if (upper === 'Ñ') return 'Ñ';
  const map: Record<string, string> = {
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    Ü: 'U',
  };
  if (map[upper]) return map[upper];
  if (/^[A-Z]$/.test(upper)) return upper;
  return null;
}

function buildDeck(era: EraFilter, mode: GameMode): HistoryEntry[] {
  const pool =
    era === 'todas'
      ? FOOTBALL_HISTORY
      : FOOTBALL_HISTORY.filter((item) => item.era === era);
  const shuffled = shuffleEntries(pool);
  return mode === 'copa' ? shuffled.slice(0, Math.min(CUP_ROUNDS, shuffled.length)) : shuffled;
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('MENU');
  const [selectedEra, setSelectedEra] = useState<EraFilter>('todas');
  const [selectedMode, setSelectedMode] = useState<GameMode>('copa');

  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UNLOCKED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch {
      // Ignore storage errors
    }
    return new Set();
  });

  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BEST_SCORE_KEY);
      return saved ? Number(saved) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [muted, setMuted] = useState(false);

  // Active Match State
  const [matchMode, setMatchMode] = useState<GameMode>('copa');
  const [matchEra, setMatchEra] = useState<EraFilter>('todas');
  const [deck, setDeck] = useState<HistoryEntry[]>([]);
  const [deckIndex, setDeckIndex] = useState(0);
  const [playPhase, setPlayPhase] = useState<PlayPhase>('PLAYING');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [historicalHintUsed, setHistoricalHintUsed] = useState(false);
  const [letterRevealsUsed, setLetterRevealsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [roundWon, setRoundWon] = useState(false);
  const [historyLog, setHistoryLog] = useState<RoundRecord[]>([]);

  const currentEntry: HistoryEntry | undefined = deck[deckIndex];
  const hasActiveGame = deck.length > 0 && playPhase !== 'GAME_OVER';

  // Persist unlocked archive IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_UNLOCKED_KEY, JSON.stringify(Array.from(unlockedIds)));
    } catch {
      // Ignore storage errors
    }
  }, [unlockedIds]);

  // Persist best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem(STORAGE_BEST_SCORE_KEY, String(score));
      } catch {
        // Ignore storage errors
      }
    }
  }, [score, bestScore]);

  const startNewMatch = useCallback(
    (eraOverride?: EraFilter, modeOverride?: GameMode) => {
      const eraToUse = eraOverride ?? selectedEra;
      const modeToUse = modeOverride ?? selectedMode;
      const newDeck = buildDeck(eraToUse, modeToUse);

      setSelectedEra(eraToUse);
      setSelectedMode(modeToUse);
      setMatchEra(eraToUse);
      setMatchMode(modeToUse);
      setDeck(newDeck);
      setDeckIndex(0);
      setPlayPhase('PLAYING');
      setGuessedLetters(new Set());
      setWrongCount(0);
      setHistoricalHintUsed(false);
      setLetterRevealsUsed(0);
      setScore(0);
      setStreak(0);
      setLastRoundPoints(0);
      setRoundWon(false);
      setHistoryLog([]);
      setActiveView('GAME');
    },
    [selectedEra, selectedMode]
  );

  const finishRound = useCallback(
    (won: boolean, finalWrongCount: number, usedHint: boolean, revealsCount: number) => {
      if (!currentEntry) return;

      let earned = 0;
      if (won) {
        const base = 100;
        const lifeBonus = Math.max(0, MAX_WRONG - finalWrongCount) * 15;
        const streakBonus = streak * 15;
        const penalties = (usedHint ? 15 : 0) + revealsCount * 30;
        earned = Math.max(25, base + lifeBonus + streakBonus - penalties);
        soundFX.playVictory();
        setScore((prev) => prev + earned);
        setStreak((prev) => prev + 1);
        setUnlockedIds((prev) => {
          const next = new Set(prev);
          next.add(currentEntry.id);
          return next;
        });
      } else {
        soundFX.playDefeat();
        setStreak(0);
      }

      setRoundWon(won);
      setLastRoundPoints(earned);
      setHistoryLog((prev) => [
        ...prev,
        {
          entry: currentEntry,
          won,
          wrongCount: finalWrongCount,
          pointsEarned: earned,
        },
      ]);
      setPlayPhase('ROUND_SUMMARY');
    },
    [currentEntry, streak]
  );

  const handleGuess = useCallback(
    (letter: string) => {
      if (activeView !== 'GAME' || playPhase !== 'PLAYING' || !currentEntry) return;
      if (guessedLetters.has(letter)) return;

      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(letter);
      setGuessedLetters(nextGuessed);

      const answerChars = currentEntry.answer.replace(/\s+/g, '').split('');
      const isHit = answerChars.includes(letter);

      if (isHit) {
        const allRevealed = answerChars.every((ch) => nextGuessed.has(ch));
        if (allRevealed) {
          finishRound(true, wrongCount, historicalHintUsed, letterRevealsUsed);
        } else {
          soundFX.playCorrect();
        }
      } else {
        const nextWrong = wrongCount + 1;
        setWrongCount(nextWrong);
        if (nextWrong >= MAX_WRONG) {
          finishRound(false, nextWrong, historicalHintUsed, letterRevealsUsed);
        } else {
          soundFX.playWrong();
        }
      }
    },
    [
      activeView,
      playPhase,
      currentEntry,
      guessedLetters,
      wrongCount,
      historicalHintUsed,
      letterRevealsUsed,
      finishRound,
    ]
  );

  const handleUseHistoricalHint = useCallback(() => {
    if (playPhase !== 'PLAYING' || historicalHintUsed) return;
    soundFX.playHint();
    setHistoricalHintUsed(true);
  }, [playPhase, historicalHintUsed]);

  const handleRevealLetter = useCallback(() => {
    if (playPhase !== 'PLAYING' || !currentEntry || letterRevealsUsed >= 2) return;
    const answerChars = Array.from(new Set(currentEntry.answer.replace(/\s+/g, '').split('')));
    const remaining = answerChars.filter((ch) => !guessedLetters.has(ch));
    if (remaining.length <= 1) return;

    const picked = remaining[Math.floor(Math.random() * remaining.length)];
    const nextGuessed = new Set(guessedLetters);
    nextGuessed.add(picked);

    soundFX.playHint();
    setGuessedLetters(nextGuessed);
    setLetterRevealsUsed((prev) => prev + 1);
  }, [playPhase, currentEntry, letterRevealsUsed, guessedLetters]);

  const handleNextRound = useCallback(() => {
    const nextIdx = deckIndex + 1;

    if (matchMode === 'copa' && nextIdx >= deck.length) {
      setPlayPhase('GAME_OVER');
      return;
    }

    if (matchMode === 'libre' && nextIdx >= deck.length) {
      const refreshed = buildDeck(matchEra, 'libre');
      setDeck(refreshed);
      setDeckIndex(0);
    } else {
      setDeckIndex(nextIdx);
    }

    setGuessedLetters(new Set());
    setWrongCount(0);
    setHistoricalHintUsed(false);
    setLetterRevealsUsed(0);
    setLastRoundPoints(0);
    setRoundWon(false);
    setPlayPhase('PLAYING');
  }, [deckIndex, deck.length, matchMode, matchEra]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundFX.setMuted(next);
      return next;
    });
  }, []);

  const handleNavigate = useCallback(
    (view: ActiveView) => {
      if (view === 'GAME' && deck.length === 0) {
        startNewMatch();
        return;
      }
      setActiveView(view);
    },
    [deck.length, startNewMatch]
  );

  // Physical Keyboard Support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeView !== 'GAME') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        if (playPhase === 'ROUND_SUMMARY') {
          e.preventDefault();
          handleNextRound();
        } else if (playPhase === 'GAME_OVER') {
          e.preventDefault();
          startNewMatch(matchEra, matchMode);
        }
        return;
      }

      if (playPhase === 'PLAYING') {
        const normalized = normalizeSpanishKey(e.key);
        if (normalized) {
          e.preventDefault();
          handleGuess(normalized);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeView, playPhase, handleGuess, handleNextRound, startNewMatch, matchEra, matchMode]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f5f0] text-slate-900">
      <TopBar
        activeView={activeView}
        hasActiveGame={hasActiveGame}
        onNavigate={handleNavigate}
        onNewMatch={() => startNewMatch()}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {activeView === 'MENU' && (
          <TitleMenu
            selectedEra={selectedEra}
            selectedMode={selectedMode}
            unlockedCount={unlockedIds.size}
            bestScore={bestScore}
            hasActiveGame={hasActiveGame}
            onSelectEra={setSelectedEra}
            onSelectMode={setSelectedMode}
            onStartGame={(eraOverride) => startNewMatch(eraOverride)}
            onResumeGame={() => setActiveView('GAME')}
          />
        )}

        {activeView === 'GAME' && currentEntry && (
          <GameBoard
            phase={playPhase}
            mode={matchMode}
            eraFilter={matchEra}
            entry={currentEntry}
            roundNumber={matchMode === 'copa' ? deckIndex + 1 : historyLog.length + (playPhase === 'PLAYING' ? 1 : 0)}
            totalRounds={matchMode === 'copa' ? deck.length : null}
            score={score}
            streak={streak}
            guessedLetters={guessedLetters}
            wrongCount={wrongCount}
            maxWrong={MAX_WRONG}
            historicalHintUsed={historicalHintUsed}
            letterRevealsUsed={letterRevealsUsed}
            lastRoundPoints={lastRoundPoints}
            roundWon={roundWon}
            historyLog={historyLog}
            muted={muted}
            onToggleMute={handleToggleMute}
            onGuess={handleGuess}
            onUseHistoricalHint={handleUseHistoricalHint}
            onRevealLetter={handleRevealLetter}
            onNextRound={handleNextRound}
            onPlayAgain={() => startNewMatch(matchEra, matchMode)}
            onReturnToMenu={() => setActiveView('MENU')}
          />
        )}

        {activeView === 'ARCHIVE' && (
          <ArchiveView
            unlockedIds={unlockedIds}
            onPlayEra={(era) => startNewMatch(era)}
          />
        )}

        {activeView === 'RULES' && (
          <RulesView
            onStartPlay={() => {
              if (hasActiveGame) {
                setActiveView('GAME');
              } else {
                startNewMatch();
              }
            }}
          />
        )}
      </main>

      <footer className="border-t border-slate-900/10 py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Crónica del Fútbol · Almanaque interactivo de historia futbolística</span>
          <span className="font-mono tabular-nums">
            {unlockedIds.size} / {FOOTBALL_HISTORY.length} hitos en archivo
          </span>
        </div>
      </footer>
    </div>
  );
}
