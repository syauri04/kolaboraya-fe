import { StrapiMedia } from "./strapi";
export interface Category {
  id: number;
  documentId: string;
  Category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiMedia;
}
