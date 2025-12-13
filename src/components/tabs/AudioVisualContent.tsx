"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { fetchAudioVisualFull } from "@/services/audio";
import { AudioVisualItem, AudioVisualSectionGrouped } from "@/types/audio";

export default function AudioVisualContent() {
  const [sections, setSections] = useState<AudioVisualSectionGrouped[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchAudioVisualFull();
      setSections(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="space-y-24">
      {/** LIMIT TO ONLY FIRST 2 SECTIONS */}
      {sections.slice(0, 2).map((section, index) => {
        const isLayout1 = index === 0; // SECTION 1
        const isLayout2 = index === 1; // SECTION 2

        return (
          <div key={section.section.id} className="space-y-18">
            {/* --- CARD INFO SECTION --- */}
            <div className="w-full bg-[#386366] rounded-[27px] p-8 md:p-14 lg:p-24 text-center mb-18">
              <h2 className="font-bruliafont text-2xl md:text-3xl lg:text-4xl text-[#FFFBE9] mb-4">
                {section.section.title}
              </h2>

              {section.section.summary && (
                <p className="text-base md:text-xl lg:text-2xl text-[#FFFBE9] leading-normal lg:leading-[29px]">
                  {section.section.summary}
                </p>
              )}
            </div>

            {/* -----------------------------------------------------------------
               LAYOUT 1 — ADA CATEGORY (SECTION 1)
            ----------------------------------------------------------------- */}
            {isLayout1 &&
              section.categories.map((cat) => (
                <div key={cat.category.id} className="space-y-8">
                  <h2 className="text-4xl font-bruliafont text-primary">
                    {cat.category.category}
                  </h2>

                  <div className="relative">
                    <div className="-mr-[50vw] pr-[50vw] !overflow-visible">
                      <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                          640: { slidesPerView: 2 },
                          768: { slidesPerView: 3 },
                          1024: { slidesPerView: 4 },
                        }}
                        className="!overflow-visible"
                        style={{ touchAction: "pan-y" }}
                      >
                        {cat.items.map((item) => (
                          <SwiperSlide key={item.id}>
                            <CardItem item={item} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              ))}

            {/* -----------------------------------------------------------------
               LAYOUT 2 — TANPA CATEGORY (SECTION 2)
            ----------------------------------------------------------------- */}
            {isLayout2 && (
              <div className="relative">
                <div className="-mr-[50vw] pr-[50vw] !overflow-visible">
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="!overflow-visible"
                    style={{ touchAction: "pan-y" }}
                  >
                    {section.items.map((item) => (
                      <SwiperSlide key={item.id}>
                        <CardItem item={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** --------------------------------------------
 *  REUSABLE CARD ITEM
 * ------------------------------------------- */
interface CardItemProps {
  item: AudioVisualItem;
}
function CardItem({ item }: CardItemProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* IMAGE */}
      <div className="relative w-full aspect-[404/227]">
        <Image
          src={
            item.image?.url
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image.url}`
              : "/assets/placeholder.png"
          }
          alt={item.title}
          fill
          className="object-cover rounded-[18px]"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-bruliafont text-primary leading-[34px]">
        {item.title}
      </h3>

      {/* SUMMARY */}
      <p className="text-2xl text-[#5C5C5C] leading-[29px]">{item.summary}</p>

      {/* DATE */}
      {item.createdAt && (
        <p className="text-2xl text-[#5C5C5C] leading-[29px]">
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
