type Props = {
  name: string;
  color: string;
  logoUrl?: string | null;
  slug?: string;
  size?: number;
  className?: string;
};

export function PartyLogo({ name, color, logoUrl, slug, size = 40, className = "" }: Props) {
  const src = logoUrl || (slug ? `/parties/${slug}.png` : null);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className={`rounded-xl object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl text-[10px] font-bold text-white ${className}`}
      style={{ width: size, height: size, background: color }}
      aria-label={name}
    >
      {name.slice(0, 3).toUpperCase()}
    </span>
  );
}
