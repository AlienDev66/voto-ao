/** Portrait URL helper. Uses original photos as-is (no background knockout). */

export function partyPhotoUrl(
  url: string | null | undefined,
  size = 160,
  _fill?: string | null,
): string | null {
  if (!url) return null;
  if (url.startsWith("data:") || url.startsWith("/")) return url;
  // Optional same-origin resize proxy — no knockout, keeps studio white
  const params = new URLSearchParams({
    url,
    size: String(size),
    knockout: "0",
    v: "plain",
  });
  return `/api/photo-proxy?${params.toString()}`;
}

/** @deprecated Prefer partyPhotoUrl */
export async function knockoutPhoto(url: string, size = 160): Promise<string | null> {
  return partyPhotoUrl(url, size);
}
