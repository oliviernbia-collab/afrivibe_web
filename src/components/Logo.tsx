interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}

const SIZES: Record<string, number> = { sm: 32, md: 44, lg: 64 };

export function Logo({ size = 'md', withTagline = true }: LogoProps) {
  const dimension = SIZES[size];
  return (
    <div className="flex items-center gap-3">
      <img src="/mark.png" alt="AfriVibe" style={{ width: dimension, height: dimension }} className="rounded-xl" />
      <div>
        <p className="font-extrabold leading-tight" style={{ fontSize: dimension * 0.42 }}>
          Afri<span className="text-primary">Vibe</span>
        </p>
        {withTagline && <p className="text-[11px] uppercase tracking-wide text-text-secondary">Créer. Partager. Gagner.</p>}
      </div>
    </div>
  );
}
