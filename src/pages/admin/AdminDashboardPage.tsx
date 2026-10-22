import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faFlag, faFilm, faMoneyBillTransfer, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { AdminDashboard } from '../../types/models';

export function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);

  useEffect(() => {
    adminApi.dashboard().then(setData).catch(() => setData(null));
  }, []);

  const cards: { label: string; value: string | number; icon: IconDefinition }[] = [
    { label: 'Utilisateurs', value: data?.totalUsers ?? '—', icon: faUsers },
    { label: 'Publications', value: data?.totalPosts ?? '—', icon: faNewspaper },
    { label: 'Vibes', value: data?.totalVibes ?? '—', icon: faFilm },
    { label: 'Retraits en attente', value: data?.pendingWithdrawals ?? '—', icon: faMoneyBillTransfer },
    { label: 'Signalements ouverts', value: data?.openReports ?? '—', icon: faFlag },
    {
      label: 'Revenus de commission',
      value: `${(data?.totalCommissionRevenue ?? 0).toLocaleString('fr-FR')} F`,
      icon: faCoins,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold">Tableau de bord</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-surface p-5">
            <FontAwesomeIcon icon={card.icon} className="mb-3 text-xl text-primary" />
            <p className="text-2xl font-extrabold text-text-primary">{card.value}</p>
            <p className="text-sm text-text-muted">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
