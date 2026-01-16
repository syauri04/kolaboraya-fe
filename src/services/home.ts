import { HomeResponse } from "@/types/home";
import { fetchFromStrapi } from "./strapi";

export async function fetchHome(): Promise<HomeResponse["data"]> {
  const res = await fetchFromStrapi<HomeResponse>(
    "/home-page?populate[sectionKolaborasi][populate]=*&populate[sectionOnText][populate]=*&populate[sectionSenarai][populate]=*&populate[sectionKolaborator][populate]=*"
  );

  const data = res.data;

  if (!data) {
    throw new Error("Data not found");
  }

  return data;
}

export function formatHomeKolaborasi(homeKolaborasi: HomeResponse["data"]) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  const attr = homeKolaborasi.sectionKolaborasi;

  const images = [attr.photo_1?.url, attr.photo_2?.url, attr.photo_3?.url]
    .filter(Boolean)
    .map((url) => API_URL + url);

  return {
    summary: attr.summary,
    summaryCircle: attr.summaryCircle,
    images,
  };
}

export function formatHomeOnText(onText: HomeResponse["data"]) {
  const attr = onText.sectionOnText;

  return {
    taglineAgenda: attr.taglineAgenda,
    summaryAgenda: attr.summaryAgenda,
  };
}

export function formatHomeSenarai(homeSenarai: HomeResponse["data"]) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  const attr = homeSenarai.sectionSenarai;

  const images = [attr.imageCard_1?.url, attr.imageCard_2?.url]
    .filter(Boolean)
    .map((url) => API_URL + url);

  return {
    summarySenarai: attr.summarySenarai,
    images,
  };
}

export function formatHomeKolaborator(homeData: HomeResponse["data"]) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  // console.log("data", homeData.sectionKolaborator);
  const attr = homeData.sectionKolaborator;

  const logos = attr.logoKolaborator
    ?.map((logo) => logo.url)
    .filter(Boolean)
    .map((url) => API_URL + url);

  return {
    id: attr.id,
    logos,
  };
}
