import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';

interface ReportRow {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  createdAt: string;
}

export function AdminReportsPage() {
  const [rows, setRows] = useState<ReportRow[]>([]);

  const load = () => {
    adminApi
      .reports('open')
      .then((data) => setRows(data as ReportRow[]))
      .catch(() => setRows([]));
  };

  useEffect(() => {
    load();
  }, []);

  const resolve = async (id: string, status: 'resolved' | 'dismissed') => {
    await adminApi.resolveReport(id, status);
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold">Signalements ouverts</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-text-muted">Aucun signalement ouvert.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-sm font-semibold text-text-primary">
                {row.targetType} · <span className="font-mono text-xs text-text-muted">{row.targetId.slice(0, 8)}…</span>
              </p>
              <p className="mt-1 text-sm text-text-secondary">{row.reason}</p>
              <p className="mt-1 text-xs text-text-muted">{new Date(row.createdAt).toLocaleString('fr-FR')}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => resolve(row.id, 'resolved')} className="rounded-lg bg-accent-green/20 px-3 py-1.5 text-xs font-bold text-accent-green">
                  Résoudre
                </button>
                <button onClick={() => resolve(row.id, 'dismissed')} className="rounded-lg bg-surface-alt px-3 py-1.5 text-xs font-bold text-text-secondary">
                  Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
