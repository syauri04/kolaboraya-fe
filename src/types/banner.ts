export interface StrapiImageFormat {
  ext: string | null;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes?: number;
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
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type StrapiMediaNullable = StrapiMedia | null;

export interface Banner {
  id: number;

  title: string;
  bgColor: string;
  imageBackground: StrapiMediaNullable | null;
}

export interface BannerResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    banner: Banner;
  };
  meta: Record<string, unknown>;
}

export interface BannerFormatted {
  title: string;
  bgColor: string;
  imageBackground: string | null;
}
