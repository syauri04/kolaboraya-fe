// services/tentang.ts
import { TentangResponse, TentangSection } from "@/types/tentang";
import { fetchFromStrapi } from "./strapi";

export async function fetchTentang(): Promise<TentangSection[]> {
  const res = await fetchFromStrapi<TentangResponse>(
    "/tentang-page?populate[sections][populate]=*"
  );

  if (!res.data?.sections) {
    return [];
  }

  return res.data.sections;
}
