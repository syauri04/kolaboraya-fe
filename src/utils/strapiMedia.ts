// Strapi returns absolute URLs when uploads go to DO Spaces (production),
// but relative "/uploads/..." paths with the local upload provider.
export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${url}`;
}
