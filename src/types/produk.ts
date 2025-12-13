import { Category } from "./category";
import { StrapiMedia } from "./strapi";

export interface ProdukItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  lembaga: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiMedia;
  Link: string;
  category_produk: Category | null;
}
