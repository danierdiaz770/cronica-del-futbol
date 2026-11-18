import { ArrowRight, Play } from 'lucide-react';
import {
  ERA_DESCRIPTIONS,
  FOOTBALL_HISTORY,
  type EraFilter,
  type EraId,
  type GameMode,
} from '../data/footballHistory';
import { ERA_IMAGES, HERO_STADIUM_IMAGE } from '../data/assets';
import { ResilientImage } from './ResilientImage';

interface TitleMenuProps {
  selectedEra: EraFilter;
  selectedMode: GameMode;
  unlockedCount: number;
  bestScore: number;
  hasActiveGame: boolean;
  onSelectEra: (era: EraFilter) => void;
  onSelectMode: (mode: GameMode) => void;
  onStartGame: (eraOverride?: EraFilter) => void;
  onResumeGame: () => void;
}

export function TitleMenu({
  selectedEra,
  selectedMode,
  unlockedCount,
  bestScore,
  hasActiveGame,
  onSelectEra,
  onSelectMode,
  onStartGame,
  onResumeGame,
}: TitleMenuProps) {
  const eraKeys: EraId[] = ['pioneros', 'dorada', 'moderna'];

  const eraFilterOptions: { id: EraFilter; label: string }[] = [
    { id: 'todas', label: 'Todas las épocas' },
    { id: 'pioneros', label: 'Orígenes' },
    { id: 'dorada', label: 'Edad Dorada' },
    { id: 'moderna', label: 'Era Moderna' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero 2-column split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-900/10 p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span>Juego de ahorcado histórico</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{FOOTBALL_HISTORY.length} hitos verificados</span>
              <span aria-hidden="true">·</span>
              <span>1848–Actualidad</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance">
              Descifra los nombres y gestas que escribieron la historia del fútbol
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Tienes seis intentos en la pizarra antes del pitido final. Elige un formato de
              partida, selecciona tu época favorita y desbloquea cada crónica para tu archivo
              histórico.
            </p>
          </div>

          <div className="space-y-5 pt-2 border-t border-slate-900/10">
            {/* Mode Selector */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">Modalidad</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectMode('copa')}
                  className={`text-left px-4 py-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] ${
                    selectedMode === 'copa'
                      ? 'bg-[#0e472a]/5 border-[#0e472a] text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-sm font-semibold">Copa de 5 Rondas</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Cinco desafíos seguidos con puntaje final
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectMode('libre')}
                  className={`text-left px-4 py-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] ${
                    selectedMode === 'libre'
                      ? 'bg-[#0e472a]/5 border-[#0e472a] text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-sm font-semibold">Práctica Libre</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Rondas continuas sin límite de palabras
                  </div>
                </button>
              </div>
            </div>

            {/* Era Selector */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">Época temática</span>
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
                {eraFilterOptions.map((option) => {
                  const isActive = selectedEra === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onSelectEra(option.id)}
                      className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onStartGame()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e472a]"
              >
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Iniciar juego</span>
              </button>

              {hasActiveGame && (
                <button
                  type="button"
                  onClick={onResumeGame}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
                >
                  <span>Reanudar partida</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Visual Column */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-900/10 min-h-[280px]">
          <ResilientImage
            src={HERO_STADIUM_IMAGE}
            alt="Balón clásico de cuero con cordones sobre el césped de un estadio histórico al atardecer"
            className="w-full h-full lg:h-full object-cover"
            fallbackLabel="Estadio Clásico"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="text-xs text-white/80 font-medium mb-1">Tu progreso histórico</div>
            <div className="flex items-baseline justify-between gap-4 border-t border-white/20 pt-3">
              <div>
                <div className="font-mono text-2xl font-semibold tabular-nums">
                  {unlockedCount} / {FOOTBALL_HISTORY.length}
                </div>
                <div className="text-xs text-white/80">Hitos archivados</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-semibold tabular-nums">{bestScore}</div>
                <div className="text-xs text-white/80">Mejor puntuación</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Era Direct Launch Showcase */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-900/10 pb-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Explorar por época
          </h2>
          <span className="text-xs text-slate-500">
            Selecciona una etapa para jugar directamente con su repertorio
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eraKeys.map((eraId) => {
            const meta = ERA_DESCRIPTIONS[eraId];
            const count = FOOTBALL_HISTORY.filter((item) => item.era === eraId).length;
            return (
              <button
                key={eraId}
                type="button"
                onClick={() => onStartGame(eraId)}
                className="group text-left bg-white rounded-xl border border-slate-900/10 overflow-hidden hover:border-[#0e472a]/50 transition-colors flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <ResilientImage
                    src={ERA_IMAGES[eraId]}
                    alt={`Ilustración histórica de ${meta.title}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                    fallbackLabel={meta.title}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
                      <span>{meta.span}</span>
                      <span aria-hidden="true">·</span>
                      <span>{count} hitos</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0e472a] transition-colors">
                      {meta.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{meta.summary}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e472a]">
                    <span>Jugar esta época</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
