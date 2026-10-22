import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';

interface WithdrawalRow {
  id: string;
  userId: string;
  provider: string;
  amount: string;
  status: string;
  createdAt: string;
}

export function AdminWithdrawalsPage() {
  const [rows, setRows] = useState<WithdrawalRow[]>([]);

  const load = () => {
    adminApi
      .withdrawals('pending')
      .then((data) => setRows(data as WithdrawalRow[]))
      .catch(() => setRows([]));
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: string) => {
    const ref = window.prompt('Référence de confirmation opérateur :');
    if (!ref) return;
    await adminApi.approveWithdrawal(id, ref);
    load();
  };

  const reject = async (id: string) => {
    const reason = window.prompt('Motif du refus :') ?? 'Non précisé';
    await adminApi.rejectWithdrawal(id, reason);
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold">Retraits en attente</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-text-muted">Aucun retrait en attente.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt text-text-secondary">
              <tr>
                <th className="px-4 py-3">Utilisateur</th>
                <th className="px-4 py-3">Opérateur</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-border bg-surface">
                  <td className="px-4 py-3 font-mono text-xs">{row.userId.slice(0, 8)}…</td>
                  <td className="px-4 py-3">{row.provider}</td>
                  <td className="px-4 py-3 font-bold">{Number(row.amount).toLocaleString('fr-FR')} F</td>
                  <td className="px-4 py-3 text-text-muted">{new Date(row.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => approve(row.id)} className="rounded-lg bg-accent-green/20 px-3 py-1.5 text-xs font-bold text-accent-green">
                        Approuver
                      </button>
                      <button onClick={() => reject(row.id)} className="rounded-lg bg-accent-pink/20 px-3 py-1.5 text-xs font-bold text-accent-pink">
                        Refuser
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
