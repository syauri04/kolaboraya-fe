// FILE: src/app/senarai/[slug]/page.tsx
// FINAL — 1 FILE VERSION (TYPES + STATIC DATA + PAGE COMPONENT)

import Image from "next/image";

// ============================
// TYPES (INLINE IN ONE FILE)
// ============================
export interface SenaraiImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface SenaraiTextBlock {
  type: "text";
  value: string;
}

export interface SenaraiImageBlock {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
}

export type SenaraiContentBlock = SenaraiTextBlock | SenaraiImageBlock;

export interface SenaraiDetail {
  title: string;
  date: string;
  cover: {
    url: string;
  } | null;
  content: SenaraiContentBlock[];
}

// ============================
// STATIC SAMPLE DATA (NO API)
// ============================
const sampleData: SenaraiDetail = {
  title: "Tentang Ruang dan Perlawanan",
  date: "19 Maret 2024",

  cover: {
    url: "/assets/blogfeatured.png",
  },

  content: [
    {
      type: "text",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum eleifend orci eu mattis. Nulla nec malesuada turpis tristique sed orci. Morbi vitae tincidunt lacus, eget commodo elit. Vivamus eget tortor eu mi dapibus posuere.",
    },

    {
      type: "image",
      url: "/assets/blog1.png",
      alt: "sample-1",
      caption: "Suspendisse hendrerit felis",
    },

    {
      type: "text",
      value:
        "Suspendisse hendrerit felis vitae urna tincidunt. Integer egestas orci ac pellentesque tempus. Nam tincidunt est sed sapien bibendum, vitae viverra ipsum feugiat.",
    },

    {
      type: "image",
      url: "/assets/blog2.png",
      alt: "sample-2",
      caption: "Lorem ipsum dolor sit amet consectetur",
    },
  ],
};

// ============================
// PAGE COMPONENT
// ============================
export default function SenaraiDetailPage() {
  const data = sampleData;

  return (
    <div className="max-w-5xl mx-auto py-10 px-3 sm:px-6 mt-[85px]">
      {/* Breadcrumb */}
      <div className="text-[#5C5C5C] text-xl sm:text-2xl font-bruliafont mb-10">
        <span>Senarai Cerita</span> <span className="mx-1">&gt;</span>
        <span className="font-medium text-[#191919]">{data.title}</span>
      </div>

      {/* Cover Image */}
      {data.cover && (
        <Image
          src={data.cover.url}
          alt={data.title}
          width={1600}
          height={900}
          className="w-full rounded-[18px] mb-12 object-cover"
        />
      )}

      <div className="sm:px-16">
        {/* Title */}
        <h1 className="text-xl sm:text-[36px] leading-[100%] text-[#191919] font-bruliafont mb-3">
          {data.title}
        </h1>

        {/* Date */}
        <p className="text-base sm:text-[24px] text-[#5C5C5C] font-bruliafont mb-8">
          {data.date}
        </p>

        {/* Rich Content */}
        <div className="prose max-w-none font-inclusive ">
          {data.content.map((block, i) => {
            if (block.type === "text") {
              return (
                <p
                  key={i}
                  className="text-base sm:text-lg text-[#191919] mb-6 leading-relaxed"
                >
                  {block.value}
                </p>
              );
            }

            if (block.type === "image") {
              return (
                <div key={i} className="my-6">
                  <Image
                    src={block.url}
                    alt={block.alt || "image"}
                    width={1200}
                    height={800}
                    className="rounded-[12px] w-full object-cover"
                  />
                  {block.caption && (
                    <p className="text-sm text-[#5C5C5C] mt-2">
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
