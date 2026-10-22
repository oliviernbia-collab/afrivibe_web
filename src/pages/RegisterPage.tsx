import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuthStore } from '../store/auth.store';
import { extractErrorMessage } from '../api/client';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [pseudo, setPseudo] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ pseudo: pseudo.trim(), fullName: fullName.trim(), phone: phone.trim(), password });
      navigate('/');
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  const fields = [
    { label: 'Pseudo', value: pseudo, set: setPseudo, placeholder: 'ex: Mariam_224' },
    { label: 'Nom complet', value: fullName, set: setFullName, placeholder: 'ex: Mariam Koné' },
    { label: 'Téléphone', value: phone, set: setPhone, placeholder: 'ex: +225 07 00 00 00 00' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo size="md" />
        </div>

        <h1 className="mb-1 text-center text-xl font-extrabold text-text-primary">Rejoindre AfriVibe</h1>
        <p className="mb-6 text-center text-sm text-text-secondary">Créez votre compte créateur et commencez à gagner.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="mb-1 block text-xs font-semibold text-text-secondary">{field.label}</label>
              <input
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 caractères minimum"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none"
            />
          </div>

          {error && <p className="text-sm font-semibold text-accent-pink">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-black disabled:opacity-60"
          >
            {isLoading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Déjà inscrit ?{' '}
          <Link to="/login" className="font-bold text-primary">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
