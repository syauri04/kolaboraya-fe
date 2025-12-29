import { fetchFromStrapi } from "./strapi";
import { SenaraiResponse } from "@/types/senarai";

const SENARAI_POPULATE = "populate=image&populate=senarai_cerita_section";

// Ambil semua senarai berdasarkan SECTION
export async function fetchSenaraisBySection(
  sectionId: number
): Promise<SenaraiResponse["data"]> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?filters[senarai_cerita_section][id][$eq]=${sectionId}&sort=publishedAt:desc&pagination[pageSize]=1000&${SENARAI_POPULATE}`
  );

  return res.data;
}

// Ambil featured per SECTION
export async function fetchFeaturedBySection(
  sectionId: number
): Promise<SenaraiResponse["data"][number] | null> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?filters[senarai_cerita_section][id][$eq]=${sectionId}&sort=publishedAt:desc&pagination[pageSize]=1&${SENARAI_POPULATE}`
  );

  return res.data.length ? res.data[0] : null;
}

// Ambil semua blog
export async function fetchSenarais(
  excludeSlug?: string
): Promise<SenaraiResponse["data"]> {
  const excludeQuery = excludeSlug ? `&filters[slug][$ne]=${excludeSlug}` : "";

  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?sort=publishedAt:desc&pagination[pageSize]=3${excludeQuery}&${SENARAI_POPULATE}`
  );

  return res.data;
}

// Ambil blog featured
export async function fetchFeaturedSenarai(): Promise<
  SenaraiResponse["data"][number] | null
> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?sort=publishedAt:desc&pagination[pageSize]=1&${SENARAI_POPULATE}`
  );

  if (!res.data.length) return null;
  return res.data[0];
}

// Ambil blog berdasarkan slug
export async function fetchSenaraiBySlug(
  slug: string
): Promise<SenaraiResponse["data"][number] | null> {
  const res = await fetchFromStrapi<SenaraiResponse>(
    `/senarai-ceritas?filters[slug][$eq]=${slug}&${SENARAI_POPULATE}`
  );

  if (!res.data.length) return null;
  return res.data[0];
}
