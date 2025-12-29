import React from "react";
import Image from "next/image";
import { fetchSenaraiBySlug } from "@/services/senarai";
import { SenaraiItem, RichTextNode } from "@/types/senarai";

// ============================
// HELPERS
// ============================
export interface LinkChild {
  text: string;
  type: string;
}

export interface LinkNodeChild {
  type: "link";
  url: string;
  children?: LinkChild[];
  target?: string;
  rel?: string;
}
// Convert Strapi rich nodes → FE blocks
// ============================
// TYPE GUARD
// ============================

function isLinkNode(
  node: { text: string; type: string } | LinkNodeChild
): node is LinkNodeChild {
  return node.type === "link" && "url" in node;
}

// ============================
// MAP FUNCTION
// ============================

export function mapRichContent(nodes: RichTextNode[]) {
  const blocks: Array<
    | { type: "text"; value: string }
    | { type: "link"; url: string; text: string }
    | { type: "image"; url: string; alt?: string; caption?: string }
  > = [];

  nodes.forEach((node) => {
    // paragraph
    if (node.type === "paragraph" && node.children) {
      node.children.forEach((child) => {
        if (child.type === "text" && "text" in child && child.text.trim()) {
          blocks.push({ type: "text", value: child.text });
        }

        if (isLinkNode(child)) {
          const linkText = child.children?.map((c) => c.text).join("") ?? child.url;
          blocks.push({ type: "link", url: child.url, text: linkText });
        }
      });
    }

    // image
    if (node.type === "image" && node.image) {
      blocks.push({
        type: "image",
        url: node.image.url,
        alt: node.image.alternativeText ?? "",
        caption: node.image.caption ?? "",
      });
    }
  });

  return blocks;
}


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ============================
// PAGE
// ============================

export default async function SenaraiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const data: SenaraiItem | null = await fetchSenaraiBySlug(slug);

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-3xl font-bold">Artikel tidak ditemukan</h1>
      </div>
    );
  }

  const blocks = mapRichContent(data.content);
  const formattedDate = formatDate(data.publishedAt);

  return (
    <div className="max-w-5xl mx-auto py-10 px-3 sm:px-6 mt-[85px]">
      {/* Breadcrumb */}
      <div className="text-[#5C5C5C] text-xl sm:text-2xl font-bruliafont mb-10">
        <span>Senarai Cerita</span> <span className="mx-1">&gt;</span>
        <span className="font-medium text-[#191919]">{data.title}</span>
      </div>

      {/* Cover Image */}
      {data.image?.url && (
        <Image
          src={
            data.image.url
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.image.url}`
              : "/assets/placeholder.png"
          }
          alt={data.title}
          width={1600}
          height={900}
          className="w-full rounded-[18px] mb-12 object-cover"
          unoptimized
        />
      )}

      <div className="sm:px-16">
        {/* Title */}
        <h1 className="text-xl sm:text-[36px] leading-[100%] text-[#191919] font-bruliafont mb-3">
          {data.title}
        </h1>

        {/* Date */}
        <p className="text-base sm:text-[24px] text-[#5C5C5C] font-bruliafont mb-8">
          {formattedDate}
        </p>

        {/* Rich Content */}
        
        <div className="prose max-w-none font-inclusive">
          {blocks.map((block, i) => {
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
                    src={
                      block.url.startsWith("http")
                        ? block.url
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${block.url}`
                    }
                    alt={block.alt ?? "image"}
                    width={1200}
                    height={800}
                    className="rounded-[12px] w-full object-cover"
                    unoptimized
                  />
                  {block.caption && (
                    <p className="text-sm text-[#5C5C5C] mt-2">
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            }

            if (block.type === "link") {
              return (
                <p key={i}>
                  <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {block.text}
                  </a>
                </p>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
