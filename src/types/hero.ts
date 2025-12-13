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

export interface BackgroundHero {
  id: number;
  photo_1: StrapiMediaNullable;
  photo_2: StrapiMediaNullable;
  photo_3: StrapiMediaNullable;
  photo_4: StrapiMediaNullable;
}

export interface Hero {
  id: number;

  titleHome: string;
  titleAbout: string;
  summaryAbout: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  backgroundHero: BackgroundHero | null;
}

export interface HeroResponse {
  data: Hero;
  meta: Record<string, unknown>;
}
