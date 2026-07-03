import {
  BannerFormatted,
  BannerResponse,
  StrapiMediaNullable,
} from "@/types/banner";
import { fetchFromStrapi } from "./strapi";

export async function fetchBannerAgenda(): Promise<BannerFormatted> {
  const res = await fetchFromStrapi<BannerResponse>(
    "/banner-agenda?populate=banner.imageBackground",
  );

  const data = res.data;

  if (!data) {
    throw new Error("Hero data not found");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const bg = data.banner.imageBackground;
  const getUrl = (media: StrapiMediaNullable) => {
    if (!media?.url) return null;
    return media.url;
  };

  return {
    title: data.banner.title,
    bgColor: data.banner.bgColor,
    imageBackground: getUrl(bg),
  };
}

export async function fetchBannerProduk(): Promise<BannerFormatted> {
  const res = await fetchFromStrapi<BannerResponse>(
    "/banner-produk?populate=banner.imageBackground&populate=SectionCollab.image",
  );

  const data = res.data;

  if (!data) {
    throw new Error("Hero data not found");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const bg = data.banner.imageBackground;
  const bgCollab = data.SectionCollab?.image;
  const getUrl = (media: StrapiMediaNullable | undefined) => {
    if (!media?.url) return null;
    return media.url;
  };

  return {
    title: data.banner.title,
    bgColor: data.banner.bgColor,
    imageBackground: getUrl(bg),
    titleCollab: data.SectionCollab?.title ?? "",
    summaryCollab: data.SectionCollab?.summary ?? "",
    bgColorCollab: data.SectionCollab?.bgColor ?? "",
    linkCollab: data.SectionCollab?.link_ketentuan ?? "",
    imageCollab: getUrl(bgCollab),
  };
}

export async function fetchBannerSenarai(): Promise<BannerFormatted> {
  const res = await fetchFromStrapi<BannerResponse>(
    "/banner-senarai?populate=banner.imageBackground&populate=SectionCollab.image",
  );

  const data = res.data;

  if (!data) {
    throw new Error("Hero data not found");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const bg = data.banner.imageBackground;
  const bgCollab = data.SectionCollab?.image;
  const getUrl = (media: StrapiMediaNullable | undefined) => {
    if (!media?.url) return null;
    return media.url;
  };

  return {
    title: data.banner.title,
    bgColor: data.banner.bgColor,
    imageBackground: getUrl(bg),
    titleCollab: data.SectionCollab?.title ?? "",
    summaryCollab: data.SectionCollab?.summary ?? "",
    bgColorCollab: data.SectionCollab?.bgColor ?? "",
    linkCollab: data.SectionCollab?.link_ketentuan ?? "",
    imageCollab: getUrl(bgCollab),
  };
}
