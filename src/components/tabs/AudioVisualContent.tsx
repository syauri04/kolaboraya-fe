"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { fetchAudioVisualFull } from "@/services/audio";
import { AudioVisualItem, AudioVisualSectionGrouped } from "@/types/audio";

/* ======================================================
   HELPER
====================================================== */
function getYouTubeId(url: string | null | undefined) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function AudioVisualContent() {
  const [sections, setSections] = useState<AudioVisualSectionGrouped[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchAudioVisualFull();
      setSections(data);
      setLoading(false);
    }
    load();
  }, []);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  /* ESC KEY CLOSE */
  useEffect(() => {
    if (!activeVideo) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeVideo, closeModal]);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <>
      <div className="space-y-24">
        {sections.slice(0, 2).map((section, index) => {
          const isLayout1 = index === 0;
          const isLayout2 = index === 1;

          return (
            <div key={section.section.id} className="space-y-18">
              {/* INFO SECTION */}
              <div className="w-full bg-[#386366] rounded-[27px] p-8 md:p-14 lg:p-24 text-center mb-18">
                <h2 className="font-bruliafont text-2xl md:text-3xl lg:text-4xl text-[#FFFBE9] mb-4">
                  {section.section.title}
                </h2>

                {section.section.summary && (
                  <p className="text-base md:text-xl lg:text-2xl text-[#FFFBE9]">
                    {section.section.summary}
                  </p>
                )}
              </div>

              {/* LAYOUT 1 */}
              {isLayout1 &&
                section.categories.map((cat) => (
                  <div key={cat.category.id} className="space-y-8">
                    <h2 className="text-4xl font-bruliafont text-primary">
                      {cat.category.category}
                    </h2>

                    <SliderWrapper>
                      {cat.items.map((item) => (
                        <SwiperSlide key={item.id}>
                          <CardItem
                            item={item}
                            onPlay={(id) => setActiveVideo(id)}
                          />
                        </SwiperSlide>
                      ))}
                    </SliderWrapper>
                  </div>
                ))}

              {/* LAYOUT 2 */}
              {isLayout2 && (
                <SliderWrapper>
                  {section.items.map((item) => (
                    <SwiperSlide key={item.id}>
                      <CardItem
                        item={item}
                        onPlay={(id) => setActiveVideo(id)}
                      />
                    </SwiperSlide>
                  ))}
                </SliderWrapper>
              )}
            </div>
          );
        })}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <VideoModal videoId={activeVideo} onClose={closeModal} />
      )}
    </>
  );
}

/* ======================================================
   SLIDER WRAPPER
====================================================== */
function SliderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mr-[50vw] pr-[50vw] !overflow-visible">
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
        {children}
      </Swiper>
    </div>
  );
}

/* ======================================================
   CARD ITEM
====================================================== */
interface CardItemProps {
  item: AudioVisualItem;
  onPlay: (videoId: string) => void;
}

function CardItem({ item, onPlay }: CardItemProps) {
  const videoId = getYouTubeId(item.link);

  return (
    <div
      className="flex flex-col gap-4 cursor-pointer group"
      onClick={() => videoId && onPlay(videoId)}
    >
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

        {/* PLAY ICON */}
        {videoId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-black text-2xl">
              ▶
            </div>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bruliafont text-primary">
        {item.title}
      </h3>

      <p className="text-2xl text-[#5C5C5C]">{item.summary}</p>

      {item.createdAt && (
        <p className="text-2xl text-[#5C5C5C]">
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

/* ======================================================
   VIDEO MODAL
====================================================== */
function VideoModal({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl z-10"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
