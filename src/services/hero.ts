import {
  HeroResponse,
  HeroSlider,
  HeroSliderResponse,
  StrapiMediaNullable,
} from "@/types/hero";
import { fetchFromStrapi } from "./strapi";
import { HeroSlide } from "@/components/HeroSlider";
export async function fetchHero(): Promise<HeroResponse["data"]> {
  const res = await fetchFromStrapi<HeroResponse>(
    "/hero-page?populate[backgroundHero][populate]=*",
  );

  const data = res.data;

  if (!data) {
    throw new Error("Hero data not found");
  }

  return data;
}

export async function fetchHeroSlider(): Promise<HeroSlide[]> {
  const res = await fetchFromStrapi<HeroSliderResponse>(
    "/hero-banners?populate=image&sort[0]=order:asc&sort[1]=publishedAt:desc",
  );

  const getUrl = (media: StrapiMediaNullable) => {
    if (!media?.url) return null;
    return media.url;
    // atau API_URL + media.url
  };

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    buttonText: item.buttonText,
    buttonHref: item.buttonHref,
    image: getUrl(item.image),
  }));
}

export function formatHero(hero: HeroResponse["data"]) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const bg = hero.backgroundHero;
  const getUrl = (media: StrapiMediaNullable) => {
    if (!media?.url) return null;
    return media.url;
  };
  // FOR LOKAL
  // const getUrl = (media: StrapiMediaNullable) => {
  //   if (!media?.url) return null;
  //   return API_URL + media.url;
  // };

  const images = [
    getUrl(bg?.photo_1 ?? null),
    getUrl(bg?.photo_2 ?? null),
    getUrl(bg?.photo_3 ?? null),
    getUrl(bg?.photo_4 ?? null),
  ].filter(Boolean) as string[];

  return {
    titleHome: hero.titleHome,
    titleAbout: hero.titleAbout,
    summaryAbout: hero.summaryAbout,
    images,
  };
}
