"use client";

import { partyPhotoUrl } from "@/lib/knockout-photo";

type Props = {
  fullName: string;
  color: string;
  photoUrl?: string | null;
  size?: number;
  className?: string;
};

export function DeputyAvatar({ fullName, color, photoUrl, size = 40, className = "" }: Props) {
  const src = partyPhotoUrl(photoUrl, Math.max(96, size * 2));
  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white ${className}`}
      style={{ width: size, height: size, background: src ? "#e5e5e5" : color }}
      aria-label={fullName}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover object-top" />
      ) : (
        <span className="font-bold text-white" style={{ fontSize: Math.max(10, size * 0.28) }}>
          {initials}
        </span>
      )}
    </span>
  );
}
