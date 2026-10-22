import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ComingSoonPageProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export function ComingSoonPage({ icon, title, description }: ComingSoonPageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-2xl text-primary">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h1 className="mb-2 text-lg font-extrabold text-text-primary">{title}</h1>
      <p className="max-w-sm text-sm text-text-muted">{description}</p>
    </div>
  );
}
