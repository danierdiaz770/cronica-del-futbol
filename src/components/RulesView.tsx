interface RulesViewProps {
  onStartPlay: () => void;
}

export function RulesView({ onStartPlay }: RulesViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-slate-900/10 pb-5 space-y-1.5">
        <div className="text-xs text-slate-500 font-medium">Guía rápida</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Reglas y Sistema de Puntuación
        </h1>
        <p className="text-sm text-slate-600">
          Todo lo necesario para completar la Copa de 5 Rondas y ampliar el archivo histórico.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-900/10 p-6 space-y-3">
          <div className="font-mono text-xs font-semibold text-[#0e472a]">01. Mecánica básica</div>
          <h2 className="text-lg font-bold text-slate-900">Seis intentos por hito</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Adivina el nombre del futbolista, estadio, torneo o regla histórica antes de que se
            complete la figura en la pizarra. Puedes usar tanto el teclado en pantalla como tu
            teclado físico.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-900/10 p-6 space-y-3">
          <div className="font-mono text-xs font-semibold text-[#0e472a]">02. Tildes y Ñ</div>
          <h2 className="text-lg font-bold text-slate-900">Ortografía simplificada</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Para agilizar la partida, las vocales se ingresan sin tilde (por ejemplo, escribe E para
            Pelé o A para Maracaná). La letra Ñ sí cuenta como letra independiente en español.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-900/10 p-6 space-y-3">
          <div className="font-mono text-xs font-semibold text-[#0e472a]">03. Pistas y puntos</div>
          <h2 className="text-lg font-bold text-slate-900">Ayudas estratégicas</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cada acierto de ronda otorga 100 puntos base más 15 puntos por cada intento sobrante y
            bono por racha. Usar una pista histórica descuenta 15 puntos y revelar una letra
            descuenta 30 puntos.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-900/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">¿Listo para saltar al campo?</h2>
          <p className="text-sm text-slate-600">
            Cada palabra resuelta queda guardada permanentemente en tu Archivo Histórico.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartPlay}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
        >
          Ir a jugar
        </button>
      </div>
    </div>
  );
}
