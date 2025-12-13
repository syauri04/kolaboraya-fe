// Untuk media Strapi
export interface StrapiFormat {
  ext: string | null;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
  sizeInBytes?: number | null;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    small?: StrapiFormat;
    medium?: StrapiFormat;
    large?: StrapiFormat;
    thumbnail?: StrapiFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RichTextNode {
  type: string;
  children?: Array<{
    text: string;
    type: string;
  }>;
  image?: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    size: number;
    width: number;
    height: number;
    caption: string | null;
    formats?: Record<string, StrapiFormat>;
    provider: string;
    createdAt: string;
    updatedAt: string;
    previewUrl: string | null;
    alternativeText: string | null;
    provider_metadata: unknown | null;
  };
}

export interface SenaraiSection {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SenaraiItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  featured: boolean;
  summary: string | null;
  content: RichTextNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage;

  /** RELATION BARU */
  senarai_cerita_section: SenaraiSection | null;
}

export interface SenaraiResponse {
  data: SenaraiItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
