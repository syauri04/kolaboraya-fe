export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

// --- MEDIA TYPE (Strapi v5) ---
export interface StrapiMediaFormat {
  ext: string | null;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    [key: string]: StrapiMediaFormat | undefined;
  };
  url: string;
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
