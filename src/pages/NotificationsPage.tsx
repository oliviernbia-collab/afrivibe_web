import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

interface NotificationItem {
  id: string;
  type: string;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

const LABELS: Record<string, string> = {
  like: 'a aimé votre publication',
  comment: 'a commenté votre publication',
  follow: 'a commencé à vous suivre',
  gift: 'vous a envoyé un cadeau',
  reward: 'Vous avez reçu un gain',
  badge: 'Nouveau badge débloqué',
  boost: 'Mise à jour de votre boost',
  mention: 'vous a mentionné',
  withdrawal: 'Mise à jour de votre retrait',
  system: 'Notification système',
};

export function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    apiClient
      .get<NotificationItem[]>('/notifications')
      .then((r) => setItems(r.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <h1 className="mb-6 text-xl font-extrabold">Notifications</h1>
      {items.length === 0 ? (
        <p className="text-sm text-text-muted">Aucune notification pour l'instant.</p>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 rounded-xl border p-4 ${n.readAt ? 'border-border bg-surface' : 'border-primary/40 bg-primary/10'}`}>
              <FontAwesomeIcon icon={faBell} className="mt-1 text-primary" />
              <div>
                <p className="text-sm text-text-primary">{LABELS[n.type] ?? n.type}</p>
                <p className="text-xs text-text-muted">{new Date(n.createdAt).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
