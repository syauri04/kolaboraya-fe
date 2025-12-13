import { fetchFromStrapi } from "./strapi";
import { SenaraiResponse } from "@/types/senarai";

const SENARAI_POPULATE =
  "populate=image&pagination[pageSize]=50&sort=publishedAt:desc";

// Ambil semua blog
export async function fetchSenarais_old(): Promise<SenaraiResponse["data"]> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?${SENARAI_POPULATE}`
  );

  return res.data;
}

// Ambil blog featured
export async function fetchFeaturedSenarai_old(): Promise<
  SenaraiResponse["data"][number] | null
> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?filters[featured][$eq]=true&${SENARAI_POPULATE}`
  );

  if (!res.data.length) return null;
  return res.data[0];
}

// Ambil blog berdasarkan slug
export async function fetchSenaraiBySlug_old(
  slug: string
): Promise<SenaraiResponse["data"][number] | null> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?filters[slug][$eq]=${slug}&${SENARAI_POPULATE}`
  );

  if (!res.data.length) return null;
  return res.data[0];
}
