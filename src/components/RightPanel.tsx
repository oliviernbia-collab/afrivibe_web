import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faFire, faTrophy, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { walletApi } from '../api/wallet';
import { Wallet } from '../types/models';
import { useAuthStore } from '../store/auth.store';

const TRENDING = [
  { tag: '#AfriVibe', count: '125.4K publications' },
  { tag: '#CôteDIvoire', count: '98.7K publications' },
  { tag: '#MusiqueAfricaine', count: '76.3K publications' },
  { tag: '#Entrepreneuriat', count: '52.1K publications' },
];

export function RightPanel() {
  const { user } = useAuthStore();
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    walletApi
      .me()
      .then(setWallet)
      .catch(() => setWallet(null));
  }, []);

  return (
    <aside className="hidden xl:flex xl:w-80 shrink-0 flex-col gap-5 border-l border-border bg-background-elevated px-5 py-6">
      {!user?.isVerified && (
        <div className="rounded-2xl bg-gold-gradient p-5 text-[#1A1206]">
          <FontAwesomeIcon icon={faCrown} className="mb-3 text-xl" />
          <p className="font-extrabold">Deviens créateur vérifié</p>
          <p className="mt-1 text-sm">Accède à plus d'outils, plus de visibilité et des revenus plus élevés.</p>
          <button className="mt-4 w-full rounded-xl bg-black/80 py-2.5 text-sm font-bold text-white">
            Vérifier mon compte
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 font-bold text-text-primary">
            <FontAwesomeIcon icon={faFire} className="text-accent-orange" /> Tendances
          </p>
          <span className="text-xs font-semibold text-primary">Voir tout</span>
        </div>
        <ul className="space-y-3">
          {TRENDING.map((t, i) => (
            <li key={t.tag} className="flex items-center justify-between text-sm">
              <div>
                <p className="text-text-muted">{i + 1}</p>
              </div>
              <div className="flex-1 px-3">
                <p className="font-semibold text-text-primary">{t.tag}</p>
                <p className="text-xs text-text-muted">{t.count}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="mb-3 flex items-center gap-2 font-bold text-text-primary">
          <FontAwesomeIcon icon={faTrophy} className="text-accent-yellow" /> Classement créateurs
        </p>
        <p className="text-sm text-text-muted">Classement disponible une fois les premiers créateurs actifs.</p>
      </div>

      <Link to="/wallet" className="rounded-2xl border border-border bg-surface p-5 hover:border-primary">
        <p className="mb-2 flex items-center gap-2 font-bold text-text-primary">
          <FontAwesomeIcon icon={faWallet} className="text-primary" /> Portefeuille
        </p>
        <p className="text-2xl font-extrabold text-text-primary">
          {Number(wallet?.balance ?? 0).toLocaleString('fr-FR')} F
        </p>
        <span className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-bold text-black">Recharger</span>
      </Link>
    </aside>
  );
}
