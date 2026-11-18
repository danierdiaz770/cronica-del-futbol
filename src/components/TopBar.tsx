export type ActiveView = 'MENU' | 'GAME' | 'ARCHIVE' | 'RULES';

interface TopBarProps {
  activeView: ActiveView;
  hasActiveGame: boolean;
  onNavigate: (view: ActiveView) => void;
  onNewMatch: () => void;
}

export function TopBar({ activeView, hasActiveGame, onNavigate, onNewMatch }: TopBarProps) {
  const navItems: { id: ActiveView; label: string }[] = [
    { id: 'GAME', label: 'Jugar' },
    { id: 'MENU', label: 'Épocas' },
    { id: 'ARCHIVE', label: 'Archivo' },
    { id: 'RULES', label: 'Reglas' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#f6f5f0]/95 backdrop-blur-sm border-b border-slate-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('MENU')}
          className="font-display text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-[#0e472a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] rounded-sm"
        >
          Crónica del Fútbol
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive =
              activeView === item.id || (item.id === 'GAME' && activeView === 'GAME' && hasActiveGame);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e472a] ${
                  isActive
                    ? 'border-[#0e472a] text-slate-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNewMatch}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0e472a] hover:bg-[#0a3620] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e472a]"
          >
            Nueva Partida
          </button>
        </div>
      </div>

      {/* Compact mobile sub-nav only on <md viewports, respecting 15% mobile sticky cap */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden border-t border-slate-900/10 px-4 py-1.5 flex items-center justify-between gap-2 text-xs font-medium bg-[#f6f5f0]"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 rounded whitespace-nowrap shrink-0 ${
                isActive ? 'text-[#0e472a] font-semibold underline underline-offset-4' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
