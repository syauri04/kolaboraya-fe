// types/audio.ts

export interface AudioVisualSection {
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

export interface AudioVisualCategory {
  id: number;
  documentId: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AudioVisualImageFormat {
  ext: string;
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

export interface AudioVisualImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: AudioVisualImageFormat;
  };
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

export interface AudioVisualItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  link: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  audio_visual_section: AudioVisualSection;
  audio_visual_category: AudioVisualCategory;

  image: AudioVisualImage;
}

export interface AudioVisualSectionGrouped {
  section: AudioVisualSection;
  categories: {
    category: AudioVisualCategory;
    items: AudioVisualItem[];
  }[];
  items: AudioVisualItem[];
}
