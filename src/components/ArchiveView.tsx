import { useState } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { FOOTBALL_HISTORY, type EraFilter } from '../data/footballHistory';

interface ArchiveViewProps {
  unlockedIds: Set<string>;
  onPlayEra: (era: EraFilter) => void;
}

export function ArchiveView({ unlockedIds, onPlayEra }: ArchiveViewProps) {
  const [filter, setFilter] = useState<EraFilter>('todas');

  const tabs: { id: EraFilter; label: string }[] = [
    { id: 'todas', label: 'Todas las épocas' },
    { id: 'pioneros', label: 'Orígenes (1848–1956)' },
    { id: 'dorada', label: 'Edad Dorada (1958–1994)' },
    { id: 'moderna', label: 'Era Moderna (1995–Hoy)' },
  ];

  const entries = FOOTBALL_HISTORY.filter((entry) =>
    filter === 'todas' ? true : entry.era === filter
  ).sort((a, b) => a.year - b.year);

  const unlockedInFilter = entries.filter((entry) => unlockedIds.has(entry.id)).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900/10 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Enciclopedia desbloqueable</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Archivo Histórico del Fútbol
          </h1>
          <p className="text-sm text-slate-600">
            Cada palabra resuelta en partida añade su crónica completa a esta colección.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="font-mono text-xl font-semibold text-slate-900 tabular-nums">
              {unlockedInFilter} / {entries.length}
            </div>
            <div className="text-xs text-slate-500">Hitos desbloqueados</div>
          </div>
          <button
            type="button"
            onClick={() => onPlayEra(filter)}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a]"
          >
            Jugar selección
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-lg w-fit">
        {tabs.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {entries.map((entry) => {
          const isUnlocked = unlockedIds.has(entry.id);
          return (
            <article
              key={entry.id}
              className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 ${
                isUnlocked
                  ? 'bg-white border-slate-900/10'
                  : 'bg-slate-100/80 border-slate-200 text-slate-500'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono tabular-nums">
                    <span className="font-semibold text-slate-700">{entry.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans">{entry.category}</span>
                  </div>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Archivado</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Bloqueado</span>
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <>
                    <h2 className="font-display text-2xl font-bold text-slate-900">
                      {entry.displayTitle}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{entry.chronicle}</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold text-slate-400 tracking-wider">
                      {entry.answer.replace(/[A-ZÑ]/g, '•')}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Pista: {entry.clue}
                    </p>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-900/10 pt-3">
                {entry.eraLabel}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
