import { faComments } from '@fortawesome/free-solid-svg-icons';
import { ComingSoonPage } from './ComingSoonPage';

export function MessagesPage() {
  return (
    <ComingSoonPage
      icon={faComments}
      title="Messagerie privée"
      description="La messagerie privée arrive en phase 2 du projet AfriVibe, après la messagerie du MVP (fil, Vibes, portefeuille, cadeaux)."
    />
  );
}
