import {
  AudioVisualSection,
  AudioVisualCategory,
  AudioVisualItem,
  AudioVisualSectionGrouped,
} from "@/types/audio";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// -----------------------------------------------------------------------------
// Helper fetch function
// -----------------------------------------------------------------------------
async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    console.warn("API Error:", res.status, endpoint);
    return [] as T;
  }

  const json = await res.json();
  return json.data ?? [];
}

// -----------------------------------------------------------------------------
// 1. Fetch Sections
// -----------------------------------------------------------------------------
export async function fetchAudioSections(): Promise<AudioVisualSection[]> {
  return apiGet<AudioVisualSection[]>(
    `/api/audio-visual-sections?sort=order:asc`
  );
}

// -----------------------------------------------------------------------------
// 2. Fetch Categories
// -----------------------------------------------------------------------------
export async function fetchAudioCategories(): Promise<AudioVisualCategory[]> {
  return apiGet<AudioVisualCategory[]>(`/api/audio-visual-categories`);
}

// -----------------------------------------------------------------------------
// 3. Fetch Items (Populated) — tanpa qs
// -----------------------------------------------------------------------------
export async function fetchAudioItems(): Promise<AudioVisualItem[]> {
  const params = new URLSearchParams({
    populate: "*",
  });

  // Strapi menerima multiple sort
  params.append("sort", "audio_visual_section.order:asc");
  params.append("sort", "id:asc");

  return apiGet<AudioVisualItem[]>(`/api/audio-visuals?${params.toString()}`);
}

// -----------------------------------------------------------------------------
// 4. Final Grouped Data untuk Component
// -----------------------------------------------------------------------------
export async function fetchAudioVisualFull(): Promise<
  AudioVisualSectionGrouped[]
> {
  const [sections, items] = await Promise.all([
    fetchAudioSections(),
    fetchAudioItems(),
  ]);

  const grouped: AudioVisualSectionGrouped[] = [];

  sections.forEach((sec) => {
    const relatedItems = items.filter(
      (item) => item.audio_visual_section?.id === sec.id
    );

    const categoriesMap: Record<
      number,
      { category: AudioVisualCategory; items: AudioVisualItem[] }
    > = {};

    relatedItems.forEach((item) => {
      const cat = item.audio_visual_category;
      if (!cat) return;

      if (!categoriesMap[cat.id]) {
        categoriesMap[cat.id] = {
          category: cat,
          items: [],
        };
      }

      categoriesMap[cat.id].items.push(item);
    });

    grouped.push({
      section: sec,
      categories: Object.values(categoriesMap),
      items: relatedItems, // ← tambahkan ini
    });
  });

  return grouped;
}
