// =========================
// MEDIA TYPE (STRAPI V5)
// =========================
export interface StrapiMediaFormat {
  ext: string;
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

export interface StrapiMediaAttributes {
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiMediaAttributes["formats"];
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// =========================
// SECTION KOLABORASI
// =========================
export interface SectionKolaborasi {
  id: number;
  summary: string;
  summaryCircle: string;
  photo_1: StrapiMedia;
  photo_2: StrapiMedia;
  photo_3: StrapiMedia;
}

// =========================
// SECTION ON TEXT
// =========================
export interface SectionOnText {
  id: number;
  taglineAgenda: string;
  summaryAgenda: string;
}

// =========================
// SECTION SENARAI
// =========================
export interface SectionSenarai {
  id: number;
  summarySenarai: string;
  imageCard_1: StrapiMedia;
  imageCard_2: StrapiMedia;
}

// =========================
// SECTION KOLABORATOR (LIST LOGO)
// =========================
export interface SectionKolaborator {
  id: number;
  logoKolaborator: StrapiMedia[];
}

// =========================
// HOME ATTRIBUTES
// =========================
export interface HomeAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  sectionKolaborasi: SectionKolaborasi;
  sectionOnText: SectionOnText;
  sectionSenarai: SectionSenarai;
  sectionKolaborator: SectionKolaborator;
}

// =========================
// HOME RESPONSE
// =========================
export interface HomeResponse {
  data: HomeAttributes;
  meta: Record<string, unknown>;
}
