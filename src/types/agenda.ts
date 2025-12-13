import { Category } from "./category";
import { StrapiMedia } from "./strapi";

export interface AgendaContentText {
  type: "text";
  text: string;
}

export interface AgendaContentParagraph {
  type: "paragraph";
  children: AgendaContentText[];
}

export type AgendaContent = AgendaContentParagraph[];

export interface AgendaItem {
  id: number;
  documentId: string;
  title: string;
  summary: string;
  content: AgendaContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  linkRegister: string;
  image: StrapiMedia;
  category_agenda: Category;
}
