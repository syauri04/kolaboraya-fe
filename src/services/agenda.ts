import { fetchFromStrapi } from "./strapi";
import { AgendaItem } from "@/types/agenda";
import { Category } from "@/types/category";
import { StrapiResponse } from "@/types/strapi";
import { AgendaItem as StrapiAgendaItem } from "@/types/agenda";

export interface FormattedAgenda {
  id: number;
  title: string;
  summary: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  linkRegister: string;
  image: string;
}

export function formatAgendaList(items: StrapiAgendaItem[]): FormattedAgenda[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    dateStart: item.dateStart,
    dateEnd: item.dateEnd,
    location: item.location,
    linkRegister: item.linkRegister,
    image: item.image?.url
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image.url}`
      : "/assets/placeholder.png",
  }));
}

// Fetch all agendas
export async function fetchAgendas(): Promise<AgendaItem[]> {
  const res = await fetchFromStrapi<StrapiResponse<AgendaItem>>(
    "/agendas?populate=image&populate=category_agenda&pagination[pageSize]=100&sort=publishedAt:desc"
  );
  return res.data;
}

// Fetch ONLY top 3 latest agendas
export async function fetchLatestAgendas(): Promise<FormattedAgenda[]> {
  const res = await fetchFromStrapi<StrapiResponse<StrapiAgendaItem>>(
    "/agendas?populate=image&populate=category_agenda&pagination[pageSize]=3&sort=publishedAt:desc"
  );

  return formatAgendaList(res.data);
}

// Fetch agenda categories
export async function fetchAgendaCategories(): Promise<Category[]> {
  const res = await fetchFromStrapi<StrapiResponse<Category>>(
    "/category-agendas?pagination[pageSize]=8"
  );
  return res.data;
}
