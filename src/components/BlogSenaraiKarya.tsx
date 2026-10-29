"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CardSectionSenarai from "./CardSectionSenarai";
import { BlogPost } from "./BlogSenarai";
import { KategoriKarya } from "@/types/senarai";

export type KaryaPost = BlogPost & {
  kategori: KategoriKarya | null;
  audio: string | null;
  author: string | null;
};

type BlogSenaraiKaryaProps = {
  posts: KaryaPost[];
  title: string;
  summary: string;
  bgColor?: string;
};

const KATEGORI: { key: KategoriKarya; label: string }[] = [
  { key: "artikel", label: "Artikel" },
  { key: "audio", label: "Audio" },
  { key: "ilustrasi", label: "Ilustrasi" },
];

function postHref(item: KaryaPost) {
  return item.url_file || `/senarai-cerita/${item.slug}`;
}

function PostLink({
  item,
  children,
}: {
  item: KaryaPost;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={postHref(item)}
      target={item.url_file ? "_blank" : undefined}
      rel={item.url_file ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

function ArtikelList({ posts }: { posts: KaryaPost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {posts.map((item) => (
        <div className="flex flex-col" key={item.id}>
          <PostLink item={item}>
            <div className="relative w-full aspect-[614/329]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-[18px]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="font-bruliafont text-xl md:text-2xl md:leading-[34px] text-primary hover:text-[#EDB133] transition mt-4 mb-2">
              {item.title}
            </h3>
          </PostLink>
          <p className="text-primary text-base sm:text-lg line-clamp-3 mb-2">
            {item.summary}
          </p>
          {/* <p className="text-primary text-base sm:text-lg">{item.date}</p> */}
        </div>
      ))}
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function AudioCard({ item }: { item: KaryaPost }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={togglePlay}
        disabled={!item.audio}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${item.title}`}
        className="group relative w-full aspect-[614/329] overflow-hidden rounded-[18px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 text-[#FFFBE9] drop-shadow-lg sm:h-14 sm:w-14"
              fill="currentColor"
            >
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-14 w-14 text-[#FFFBE9] drop-shadow-lg sm:h-16 sm:w-16"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>

        {item.audio && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 sm:px-5">
            <div
              aria-hidden="true"
              className="flex h-5 flex-1 items-end gap-[3px]"
            >
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-full flex-1 origin-bottom rounded-full bg-[#FFFBE9] ${
                    isPlaying ? "animate-eq" : ""
                  }`}
                  style={
                    isPlaying
                      ? {
                          animationDelay: `${(i % 7) * 0.08}s`,
                          animationDuration: `${0.7 + (i % 5) * 0.08}s`,
                        }
                      : { transform: "scaleY(0.15)" }
                  }
                />
              ))}
            </div>
            {duration > 0 && (
              <span className="shrink-0 text-xs font-medium text-[#FFFBE9] drop-shadow sm:text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>
        )}

        {item.audio && (
          <audio
            ref={audioRef}
            src={item.audio}
            preload="metadata"
            onEnded={(e) => {
              setIsPlaying(false);
              e.currentTarget.currentTime = 0;
              setCurrentTime(0);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            className="hidden"
          />
        )}
      </button>

      <PostLink item={item}>
        <h3 className="font-bruliafont text-xl md:text-2xl md:leading-[34px] text-primary hover:text-[#EDB133] transition mt-4 mb-2">
          {item.title}
        </h3>
      </PostLink>
      <p className="text-primary text-base sm:text-lg line-clamp-3">
        {item.summary}
      </p>
    </div>
  );
}

function AudioList({ posts }: { posts: KaryaPost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {posts.map((item) => (
        <AudioCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ImageLightbox({
  item,
  onClose,
}: {
  item: KaryaPost;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 cursor-pointer text-[#FFFBE9] hover:text-[#EDB133] transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-9 w-9 sm:h-11 sm:w-11"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}

function IlustrasiList({ posts }: { posts: KaryaPost[] }) {
  const [active, setActive] = useState<KaryaPost | null>(null);
  const closeLightbox = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {posts.map((item) => (
          <div className="flex flex-col" key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              aria-label={`Lihat ${item.title}`}
              className="group relative w-full aspect-[4/3] overflow-hidden rounded-[18px] cursor-zoom-in"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </button>

            <h3 className="font-bruliafont text-xl md:text-2xl md:leading-[34px] text-primary mt-4">
              {item.title}
            </h3>
            {item.author && (
              <p className="text-sm sm:text-base text-[#6B6B6B] mt-1">
                Oleh {item.author}
              </p>
            )}
            <p className="text-primary text-base sm:text-lg line-clamp-3 mt-2">
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      {active && <ImageLightbox item={active} onClose={closeLightbox} />}
    </>
  );
}

export default function BlogSenaraiKarya({
  posts,
  title,
  summary,
  bgColor,
}: BlogSenaraiKaryaProps) {
  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      <CardSectionSenarai title={title} summary={summary} bgColor={bgColor} />

      {KATEGORI.map(({ key, label }) => {
        // Post tanpa kategori diperlakukan sebagai artikel
        const items = posts.filter((p) => (p.kategori ?? "artikel") === key);
        if (!items.length) return null;

        return (
          <div key={key} className="mb-16 last:mb-0">
            <span
              className="inline-block font-bruliafont text-xl md:text-2xl text-[#FFFBE9] px-6 py-2 rounded-[10px] mb-8"
              style={{ backgroundColor: bgColor || "#386366" }}
            >
              {label}
            </span>

            {key === "artikel" && <ArtikelList posts={items} />}
            {key === "audio" && <AudioList posts={items} />}
            {key === "ilustrasi" && <IlustrasiList posts={items} />}
          </div>
        );
      })}
    </section>
  );
}
