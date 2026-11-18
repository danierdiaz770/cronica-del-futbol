import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface HangmanCanvasProps {
  wrongCount: number;
  maxWrong: number;
  status: 'PLAYING' | 'WON' | 'LOST';
}

export function HangmanCanvas({ wrongCount, maxWrong, status }: HangmanCanvasProps) {
  const remaining = Math.max(0, maxWrong - wrongCount);

  const renderStatusLabel = () => {
    if (status === 'WON') {
      return (
        <span className="inline-flex items-center gap-1.5 text-emerald-200 font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Resuelto · Punto asegurado</span>
        </span>
      );
    }
    if (status === 'LOST') {
      return (
        <span className="inline-flex items-center gap-1.5 text-rose-200 font-semibold">
          <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Pitido final · Sin intentos</span>
        </span>
      );
    }
    if (remaining === 1) {
      return (
        <span className="inline-flex items-center gap-1.5 text-amber-200 font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Tarjeta amarilla · Último intento</span>
        </span>
      );
    }
    return (
      <span className="text-emerald-100/90 font-medium">
        En juego · <span className="tabular-nums font-mono">{remaining}</span>{' '}
        {remaining === 1 ? 'intento restante' : 'intentos restantes'}
      </span>
    );
  };

  return (
    <div className="bg-[#0e472a] text-white rounded-xl border border-emerald-950/30 p-5 sm:p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 text-xs text-emerald-100/80 border-b border-white/15 pb-3">
        <span>Pizarra de Campo</span>
        <span className="font-mono tabular-nums">
          Fallos: {wrongCount} / {maxWrong}
        </span>
      </div>

      {/* SVG Goalpost & Classic 6-Stage Hangman Chalk Drawing */}
      <div className="my-4 flex items-center justify-center">
        <svg
          viewBox="0 0 280 220"
          className="w-full max-w-[260px] h-auto"
          role="img"
          aria-label={`Dibujo del ahorcado en portería: ${wrongCount} de ${maxWrong} fallos`}
        >
          {/* Pitch ground chalk line & penalty arc hint */}
          <line x1="20" y1="196" x2="260" y2="196" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 45 196 Q 140 182 235 196" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />

          {/* Goalpost / Crossbar structure */}
          <line x1="56" y1="196" x2="56" y2="28" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="56" y1="28" x2="188" y2="28" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="56" y1="58" x2="86" y2="28" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
          {/* Subtle goal net lines on left */}
          <path
            d="M 56 36 L 34 44 L 34 196 M 45 40 L 45 196 M 34 78 L 56 78 M 34 118 L 56 118 M 34 158 L 56 158"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />

          {/* Hanging rope from crossbar */}
          <line x1="168" y1="28" x2="168" y2="54" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />

          {/* Small football resting near post */}
          <circle cx="96" cy="186" r="9" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
          <circle cx="96" cy="186" r="2.5" fill="rgba(255,255,255,0.55)" />

          {/* Stage 1: Head */}
          <circle
            cx="168"
            cy="72"
            r="17"
            fill="none"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 1 ? 1 : 0 }}
          />
          {/* Subtle face expression on defeat */}
          {status === 'LOST' && wrongCount >= 6 && (
            <g stroke="#fda4af" strokeWidth="1.8" strokeLinecap="round">
              <line x1="160" y1="67" x2="164" y2="71" />
              <line x1="164" y1="67" x2="160" y2="71" />
              <line x1="172" y1="67" x2="176" y2="71" />
              <line x1="176" y1="67" x2="172" y2="71" />
              <path d="M 162 81 Q 168 77 174 81" fill="none" />
            </g>
          )}

          {/* Stage 2: Torso */}
          <line
            x1="168"
            y1="89"
            x2="168"
            y2="138"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            strokeLinecap="round"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 2 ? 1 : 0 }}
          />

          {/* Stage 3: Left Arm */}
          <line
            x1="168"
            y1="100"
            x2="142"
            y2="122"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            strokeLinecap="round"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 3 ? 1 : 0 }}
          />

          {/* Stage 4: Right Arm */}
          <line
            x1="168"
            y1="100"
            x2="194"
            y2="122"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            strokeLinecap="round"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 4 ? 1 : 0 }}
          />

          {/* Stage 5: Left Leg */}
          <line
            x1="168"
            y1="138"
            x2="146"
            y2="174"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            strokeLinecap="round"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 5 ? 1 : 0 }}
          />

          {/* Stage 6: Right Leg */}
          <line
            x1="168"
            y1="138"
            x2="190"
            y2="174"
            stroke={status === 'LOST' ? '#fda4af' : '#ffffff'}
            strokeWidth="3.2"
            strokeLinecap="round"
            className="transition-opacity duration-200"
            style={{ opacity: wrongCount >= 6 ? 1 : 0 }}
          />
        </svg>
      </div>

      {/* 6-step visual meter + non-hue-only text status */}
      <div className="space-y-3 border-t border-white/15 pt-3">
        <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
          {Array.from({ length: maxWrong }).map((_, index) => {
            const isUsed = index < wrongCount;
            return (
              <div
                key={index}
                className={`h-1.5 rounded-sm transition-colors duration-200 ${
                  isUsed ? 'bg-rose-400' : 'bg-white/25'
                }`}
              />
            );
          })}
        </div>
        <div className="text-xs flex items-center justify-between gap-2">{renderStatusLabel()}</div>
      </div>
    </div>
  );
}
