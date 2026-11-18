import { ArrowRight, BookOpen, Lightbulb, RotateCcw, Sparkles, Trophy, Volume2, VolumeX } from 'lucide-react';
import { ERA_DESCRIPTIONS, type EraFilter, type GameMode, type HistoryEntry } from '../data/footballHistory';
import { HangmanCanvas } from './HangmanCanvas';
import { Keyboard } from './Keyboard';

export type RoundRecord = {
  entry: HistoryEntry;
  won: boolean;
  wrongCount: number;
  pointsEarned: number;
};

interface GameBoardProps {
  phase: 'PLAYING' | 'ROUND_SUMMARY' | 'GAME_OVER';
  mode: GameMode;
  eraFilter: EraFilter;
  entry: HistoryEntry;
  roundNumber: number;
  totalRounds: number | null;
  score: number;
  streak: number;
  guessedLetters: Set<string>;
  wrongCount: number;
  maxWrong: number;
  historicalHintUsed: boolean;
  letterRevealsUsed: number;
  lastRoundPoints: number;
  roundWon: boolean;
  historyLog: RoundRecord[];
  muted: boolean;
  onToggleMute: () => void;
  onGuess: (letter: string) => void;
  onUseHistoricalHint: () => void;
  onRevealLetter: () => void;
  onNextRound: () => void;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

export function GameBoard({
  phase,
  mode,
  eraFilter,
  entry,
  roundNumber,
  totalRounds,
  score,
  streak,
  guessedLetters,
  wrongCount,
  maxWrong,
  historicalHintUsed,
  letterRevealsUsed,
  lastRoundPoints,
  roundWon,
  historyLog,
  muted,
  onToggleMute,
  onGuess,
  onUseHistoricalHint,
  onRevealLetter,
  onNextRound,
  onPlayAgain,
  onReturnToMenu,
}: GameBoardProps) {
  const answerLetters = new Set(entry.answer.replace(/\s+/g, '').split(''));
  const words = entry.answer.split(' ');
  const unrevealedCount = Array.from(answerLetters).filter((ch) => !guessedLetters.has(ch)).length;

  const eraTitle =
    eraFilter === 'todas' ? 'Todas las épocas' : ERA_DESCRIPTIONS[eraFilter].title;

  if (phase === 'GAME_OVER') {
    const wonRounds = historyLog.filter((item) => item.won).length;
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-xl border border-slate-900/10 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/10 pb-5">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-medium">
                {eraTitle} · Copa de {totalRounds} Rondas
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                Acta Final del Partido
              </h1>
            </div>
            <div className="flex items-center gap-3 text-[#0e472a]">
              <Trophy className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
              <div>
                <div className="font-mono text-3xl font-bold tabular-nums">{score} pts</div>
                <div className="text-xs text-slate-500">Puntuación total</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#f6f5f0] rounded-lg p-4 border border-slate-900/10">
              <div className="text-xs text-slate-500">Hitos acertados</div>
              <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
                {wonRounds} / {historyLog.length}
              </div>
            </div>
            <div className="bg-[#f6f5f0] rounded-lg p-4 border border-slate-900/10">
              <div className="text-xs text-slate-500">Efectividad</div>
              <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
                {historyLog.length > 0 ? Math.round((wonRounds / historyLog.length) * 100) : 0}%
              </div>
            </div>
            <div className="bg-[#f6f5f0] rounded-lg p-4 border border-slate-900/10">
              <div className="text-xs text-slate-500">Racha final</div>
              <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
                {streak}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">Resumen de rondas</h2>
            <div className="divide-y divide-slate-900/10 border border-slate-900/10 rounded-lg overflow-hidden">
              {historyLog.map((record, idx) => (
                <div
                  key={record.entry.id}
                  className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-semibold text-slate-900 truncate">
                      {record.entry.displayTitle}
                    </span>
                    <span className="text-xs text-slate-500 font-mono tabular-nums shrink-0">
                      {record.entry.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs shrink-0">
                    <span className={record.won ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                      {record.won ? 'Resuelto' : 'Sin acertar'}
                    </span>
                    <span className="font-mono text-slate-600 tabular-nums">
                      +{record.pointsEarned} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Jugar de nuevo</span>
            </button>
            <button
              type="button"
              onClick={onReturnToMenu}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
            >
              Cambiar época
            </button>
          </div>
        </section>
      </div>
    );
  }

  const canvasStatus =
    phase === 'PLAYING' ? 'PLAYING' : roundWon ? 'WON' : 'LOST';

  return (
    <div className="space-y-6">
      {/* Workspace HUD toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/10 pb-3 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-900">
            {mode === 'copa' ? 'Copa Histórica' : 'Práctica Libre'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{eraTitle}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-slate-900 font-medium">
            {totalRounds ? `Ronda ${roundNumber} / ${totalRounds}` : `Ronda ${roundNumber}`}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 font-mono tabular-nums text-xs sm:text-sm">
            <span className="text-slate-900 font-semibold">{score} pts</span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <span className="text-slate-600">Racha: {streak}</span>
          </div>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido'}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
          >
            {muted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Silencio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Sonido</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 2-column game layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pitch Chalkboard & Goalpost Hangman */}
        <div className="lg:col-span-5">
          <HangmanCanvas
            wrongCount={wrongCount}
            maxWrong={maxWrong}
            status={canvasStatus}
          />
        </div>

        {/* Right: Word Tiles, Clues, Hints & Keyboard / Round Summary */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-900/10 p-5 sm:p-7 space-y-6">
          {/* Unboxed Metadata + Clue */}
          <div className="space-y-2 border-b border-slate-900/10 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{entry.eraLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-700 font-semibold">
                {entry.year}
              </span>
              <span aria-hidden="true">·</span>
              <span>{entry.category}</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
              {entry.clue}
            </p>
            {historicalHintUsed && (
              <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5 mt-2">
                <span className="font-semibold">Pista adicional:</span> {entry.historicalHint}
              </p>
            )}
          </div>

          {/* Word Letter Slots (never wraps mid-word) */}
          <div
            className="py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Palabra por adivinar"
          >
            {words.map((word, wordIdx) => (
              <div key={wordIdx} className="flex items-center gap-1.5 sm:gap-2">
                {word.split('').map((char, charIdx) => {
                  const isRevealed = guessedLetters.has(char);
                  const showMissedOnLoss = phase !== 'PLAYING' && !roundWon && !isRevealed;

                  return (
                    <div
                      key={`${wordIdx}-${charIdx}`}
                      className={`w-8 sm:w-11 h-11 sm:h-13 rounded-lg border-b-2 flex items-center justify-center font-display text-2xl sm:text-3xl font-bold transition-colors ${
                        isRevealed
                          ? 'bg-[#f6f5f0] border-[#0e472a] text-slate-900'
                          : showMissedOnLoss
                            ? 'bg-rose-50 border-rose-400 text-rose-700'
                            : 'bg-slate-50 border-slate-300 text-transparent'
                      }`}
                    >
                      {isRevealed || showMissedOnLoss ? char : '_'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Phase-dependent Lower Area */}
          {phase === 'PLAYING' ? (
            <div className="space-y-5 pt-2 border-t border-slate-900/10">
              {/* Hint Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={historicalHintUsed}
                    onClick={onUseHistoricalHint}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    <span>{historicalHintUsed ? 'Pista usada' : 'Pista histórica (-15 pts)'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={letterRevealsUsed >= 2 || unrevealedCount <= 1}
                    onClick={onRevealLetter}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0e472a]" aria-hidden="true" />
                    <span>
                      Revelar letra ({2 - letterRevealsUsed} disp. · -30 pts)
                    </span>
                  </button>
                </div>

                <span className="text-xs text-slate-500 hidden sm:inline">
                  También puedes escribir con tu teclado
                </span>
              </div>

              <Keyboard
                guessedLetters={guessedLetters}
                answerLetters={answerLetters}
                disabled={false}
                onGuess={onGuess}
              />
            </div>
          ) : (
            /* ROUND_SUMMARY inline chronicle reveal */
            <div className="pt-4 border-t border-slate-900/10 space-y-4">
              <div
                className={`rounded-lg border p-4 sm:p-5 space-y-2 ${
                  roundWon
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-rose-50/70 border-rose-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen
                      className={`w-4 h-4 ${roundWon ? 'text-emerald-800' : 'text-rose-800'}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm font-bold ${
                        roundWon ? 'text-emerald-900' : 'text-rose-900'
                      }`}
                    >
                      {roundWon
                        ? `¡Correcto! ${entry.displayTitle} (${entry.year})`
                        : `Respuesta: ${entry.displayTitle} (${entry.year})`}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-slate-700">
                    {roundWon ? `+${lastRoundPoints} pts · Guardado en Archivo` : '+0 pts'}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{entry.chronicle}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onNextRound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
                >
                  <span>
                    {totalRounds && roundNumber >= totalRounds
                      ? 'Ver acta final'
                      : 'Siguiente ronda'}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-slate-500">Pulsa Enter para continuar</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
