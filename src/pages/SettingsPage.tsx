import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faGlobe, faIdCard, faLock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAuthStore } from '../store/auth.store';

const ITEMS: { icon: IconDefinition; label: string }[] = [
  { icon: faIdCard, label: 'Vérification (KYC)' },
  { icon: faLock, label: 'Confidentialité & sécurité' },
  { icon: faGlobe, label: 'Langue' },
  { icon: faQuestionCircle, label: 'Aide & support' },
];

export function SettingsPage() {
  const { logout } = useAuthStore();

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <h1 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
        <FontAwesomeIcon icon={faGear} /> Paramètres
      </h1>

      <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {ITEMS.map((item) => (
          <button key={item.label} className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-medium text-text-primary hover:bg-surface-alt">
            <FontAwesomeIcon icon={item.icon} className="w-4 text-text-secondary" />
            {item.label}
          </button>
        ))}
      </div>

      <button onClick={logout} className="mt-6 w-full rounded-xl border border-accent-pink/40 py-3 text-sm font-bold text-accent-pink">
        Se déconnecter
      </button>
    </div>
  );
}
