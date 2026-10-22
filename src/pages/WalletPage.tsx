import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faExchangeAlt,
  faEye,
  faGift,
  faHeart,
  faPercentage,
  faPlusCircle,
  faRocket,
  faSlidersH,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { walletApi } from '../api/wallet';
import { Wallet, WalletTransaction } from '../types/models';

const TX_LABELS: Record<string, string> = {
  recharge: 'Recharge',
  withdrawal: 'Retrait',
  gift_sent: 'Cadeau envoyé',
  gift_received: 'Cadeau reçu',
  reward_likes: 'Gain — likes',
  reward_views: 'Gain — vues',
  boost_payment: 'Boost',
  commission: 'Commission',
  refund: 'Remboursement',
  adjustment: 'Ajustement',
};

const TX_ICONS: Record<string, IconDefinition> = {
  recharge: faPlusCircle,
  withdrawal: faArrowUp,
  gift_sent: faGift,
  gift_received: faGift,
  reward_likes: faHeart,
  reward_views: faEye,
  boost_payment: faRocket,
  commission: faPercentage,
  refund: faUndo,
  adjustment: faSlidersH,
};

export function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    walletApi.me().then(setWallet).catch(() => setWallet(null));
    walletApi.transactions().then(setTransactions).catch(() => setTransactions([]));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <h1 className="mb-6 text-xl font-extrabold">Portefeuille</h1>

      <div className="mb-8 rounded-2xl bg-gold-gradient p-6 text-[#1A1206]">
        <p className="text-sm font-bold">Solde disponible</p>
        <p className="mt-1 text-4xl font-extrabold">{Number(wallet?.balance ?? 0).toLocaleString('fr-FR')} F</p>
        {Number(wallet?.pendingBalance ?? 0) > 0 && (
          <p className="mt-1 text-xs font-semibold">
            + {Number(wallet?.pendingBalance).toLocaleString('fr-FR')} F en attente de validation
          </p>
        )}
        <div className="mt-5 flex gap-3">
          <button className="rounded-xl bg-black/80 px-5 py-2.5 text-sm font-bold text-white">Recharger</button>
          <button className="rounded-xl border border-black/30 px-5 py-2.5 text-sm font-bold text-[#1A1206]">
            Retirer
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-sm font-bold text-text-primary">Historique des transactions</h2>
      <div className="space-y-2">
        {transactions.length === 0 && <p className="text-sm text-text-muted">Aucune transaction pour l'instant.</p>}
        {transactions.map((tx) => {
          const amount = Number(tx.amount);
          return (
            <div key={tx.id} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-primary">
                <FontAwesomeIcon icon={TX_ICONS[tx.type] ?? faExchangeAlt} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{TX_LABELS[tx.type] ?? tx.type}</p>
                <p className="text-xs text-text-muted">{new Date(tx.createdAt).toLocaleString('fr-FR')}</p>
              </div>
              <p className={`text-sm font-extrabold ${amount >= 0 ? 'text-accent-green' : 'text-accent-pink'}`}>
                {amount >= 0 ? '+' : ''}
                {amount.toLocaleString('fr-FR')} F
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
