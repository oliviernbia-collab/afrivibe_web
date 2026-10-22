import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFlag, faMoneyBillTransfer, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';

const NAV_ITEMS = [
  { to: '/admin', label: 'Tableau de bord', icon: faChartPie, end: true },
  { to: '/admin/withdrawals', label: 'Retraits', icon: faMoneyBillTransfer },
  { to: '/admin/reports', label: 'Signalements', icon: faFlag },
];

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <aside className="w-64 shrink-0 border-r border-border bg-background-elevated px-4 py-6">
        <div className="mb-2 px-1">
          <Logo size="sm" />
        </div>
        <p className="mb-6 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wide text-text-muted">
          <FontAwesomeIcon icon={faShieldHalved} /> Back-office
        </p>
        <nav className="space-y-1">
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
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
