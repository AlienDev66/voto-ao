/** Helpers for Assembleia Nacional (parlamento.ao) entity URLs and photos. */

export function parlamentoEntitySlug(fullName: string, opts?: { doubleParticles?: boolean }): string {
  // Example: Aia_Eza_Nacilia_Gomes_da__Silva_Troso_ (some names use da__, others keep da_)
  const stripped = fullName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/-/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const withParticles = opts?.doubleParticles
    ? stripped.replace(/_(da|de|do|dos|das|e)_([A-Z])/g, "_$1__$2")
    : stripped;

  return `${withParticles}_`;
}

export function parlamentoEntitySlugCandidates(fullName: string): string[] {
  return [
    ...new Set([
      parlamentoEntitySlug(fullName),
      parlamentoEntitySlug(fullName, { doubleParticles: true }),
    ]),
  ];
}

export function parlamentoEntityUrl(fullName: string): string {
  // Prefer the double-particle form when linking; many fichas use it (e.g. da__Silva).
  return `https://parlamento.ao/entidades/${parlamentoEntitySlug(fullName, { doubleParticles: true })}`;
}

export function parlamentoPhotoUrl(imgCapa: string): string {
  return `https://portaladmin.parlamento.ao/storage/${imgCapa.replace(/^\/+/, "")}`;
}

export function initials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
