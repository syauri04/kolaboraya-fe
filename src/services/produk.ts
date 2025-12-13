import { fetchFromStrapi } from "./strapi";
import { Category } from "@/types/category";
import { ProdukItem } from "@/types/produk";
import { StrapiResponse } from "@/types/strapi";

// Fetch all agendas
export async function fetchProduks(): Promise<ProdukItem[]> {
  const res = await fetchFromStrapi<StrapiResponse<ProdukItem>>(
    "/produk-moduls?populate=image&pagination[pageSize]=16&sort=publishedAt:desc"
  );
  return res.data;
}

// Fetch agenda categories
export async function fetchProdukCategories(): Promise<Category[]> {
  const res = await fetchFromStrapi<StrapiResponse<Category>>(
    "/category-produks?populate=image&pagination[pageSize]=3"
  );
  return res.data;
}
