import { fetchFromStrapi } from "./strapi";

export interface SenaraiSectionResponse {
  data: {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    order: number;
  }[];
}

export async function fetchSenaraiSections() {
  const res = await fetchFromStrapi<SenaraiSectionResponse>(
    `/senarai-cerita-sections?sort=order:asc`
  );

  return res.data;
}
