import { useNavigate } from 'react-router-dom';
import { Composer } from '../components/Composer';

export function CreatePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <h1 className="mb-6 text-xl font-extrabold">Créer une publication</h1>
      <Composer onPublished={() => navigate('/')} />
      <p className="text-center text-xs text-text-muted">
        Pour publier une Vibe (vidéo courte verticale), utilisez l'application mobile AfriVibe.
      </p>
    </div>
  );
}
