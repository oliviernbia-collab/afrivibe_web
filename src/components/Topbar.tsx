import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../store/auth.store';

export function Topbar() {
  const { user } = useAuthStore();

  return (
    <header className="flex items-center gap-4 border-b border-border bg-background-elevated px-6 py-3">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5">
        <FontAwesomeIcon icon={faSearch} className="text-text-muted" />
        <input
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          placeholder="Rechercher des créateurs, contenus, hashtags..."
        />
      </div>

      <button className="relative rounded-full border border-border bg-surface p-3 text-text-secondary hover:text-text-primary">
        <FontAwesomeIcon icon={faBell} />
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-surface-alt text-sm font-bold text-text-secondary">
          {user?.avatarUrl ? <img src={user.avatarUrl} alt={user.pseudo} className="h-full w-full object-cover" /> : user?.pseudo?.slice(0, 2).toUpperCase()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-text-primary">{user?.pseudo}</p>
          <p className="text-xs text-text-muted">Créateur</p>
        </div>
      </div>
    </header>
  );
}
