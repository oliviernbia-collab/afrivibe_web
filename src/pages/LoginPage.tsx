import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuthStore } from '../store/auth.store';
import { extractErrorMessage } from '../api/client';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(identifier.trim(), password);
      navigate('/');
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <h1 className="mb-1 text-center text-xl font-extrabold text-text-primary">Content de vous revoir</h1>
        <p className="mb-6 text-center text-sm text-text-secondary">
          Connectez-vous pour continuer à créer, partager et gagner.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">Téléphone, e-mail ou pseudo</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none"
              placeholder="ex: +225 07 00 00 00 00"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-semibold text-accent-pink">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-black disabled:opacity-60"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-bold text-primary">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
