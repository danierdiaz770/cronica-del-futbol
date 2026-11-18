import { Check, X } from 'lucide-react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

interface KeyboardProps {
  guessedLetters: Set<string>;
  answerLetters: Set<string>;
  disabled: boolean;
  onGuess: (letter: string) => void;
}

export function Keyboard({ guessedLetters, answerLetters, disabled, onGuess }: KeyboardProps) {
  return (
    <div className="space-y-2" role="group" aria-label="Teclado de letras en español">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-1.5 sm:gap-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && answerLetters.has(letter);
            const isWrong = isGuessed && !answerLetters.has(letter);

            let stateClasses =
              'bg-white text-slate-900 border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:translate-y-px shadow-[0_1px_0_rgba(15,23,42,0.08)]';
            if (isCorrect) {
              stateClasses =
                'bg-[#0e472a] text-white border-[#0e472a] shadow-none cursor-default';
            } else if (isWrong) {
              stateClasses =
                'bg-slate-100 text-slate-400 border-slate-200 shadow-none line-through cursor-default';
            } else if (disabled) {
              stateClasses =
                'bg-white/60 text-slate-400 border-slate-200 shadow-none cursor-not-allowed';
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={disabled || isGuessed}
                onClick={() => onGuess(letter)}
                aria-label={
                  isCorrect
                    ? `Letra ${letter}, acierto`
                    : isWrong
                      ? `Letra ${letter}, fallo`
                      : `Elegir letra ${letter}`
                }
                className={`relative min-w-[30px] sm:min-w-[42px] flex-1 max-w-[48px] h-11 sm:h-12 rounded-lg border font-display text-lg sm:text-xl font-bold tracking-wide flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] focus-visible:ring-offset-1 ${stateClasses}`}
              >
                <span>{letter}</span>
                {isCorrect && (
                  <Check
                    className="w-2.5 h-2.5 absolute top-1 right-1 text-emerald-200"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                )}
                {isWrong && (
                  <X
                    className="w-2.5 h-2.5 absolute top-1 right-1 text-slate-400"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
