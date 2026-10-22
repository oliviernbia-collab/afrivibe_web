import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faComments,
  faCompass,
  faGear,
  faHome,
  faPlusCircle,
  faSignOutAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuthStore } from '../store/auth.store';

const NAV_ITEMS = [
  { to: '/', label: 'Accueil', icon: faHome, end: true },
  { to: '/vibes', label: 'Vibes', icon: faCompass },
  { to: '/create', label: 'Créer', icon: faPlusCircle },
  { to: '/messages', label: 'Messages', icon: faComments },
  { to: '/notifications', label: 'Notifications', icon: faBell },
  { to: '/wallet', label: 'Portefeuille', icon: faWallet },
  { to: '/settings', label: 'Paramètres', icon: faGear },
];

export function Sidebar() {
  const { logout } = useAuthStore();

  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-border bg-background-elevated px-4 py-6">
      <div className="mb-8 px-1">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive ? 'bg-primary text-black' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-accent-pink hover:bg-surface"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
        Se déconnecter
      </button>
    </aside>
  );
}
