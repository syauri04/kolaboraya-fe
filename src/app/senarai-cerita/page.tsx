"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import BlogSenarai from "@/components/BlogSenarai";
import BlogSenaraiTwo from "@/components/BlogSenaraiTwo";
import BlogSenaraiFour from "@/components/BlogSenaraiFour";
import SkeletonBanner from "@/components/SkeletonBanner";

import { fetchBannerSenarai } from "@/services/banner";
import {
  fetchFeaturedBySection,
  fetchSenaraisBySection,
} from "@/services/senarai";

import { BannerFormatted } from "@/types/banner";
import { BlogPost } from "@/components/BlogSenarai";
import { SenaraiItem } from "@/types/senarai";
import { fetchSenaraiSections } from "@/services/senaraiSection";

function mapSenaraiToBlogPost(item: SenaraiItem): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary ?? "",
    image: item.image?.url ? `${item.image.url}` : "/assets/placeholder.png",
    date: new Date(item.publishedAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    featured: item.featured,
  };
}

type SectionData = {
  sectionId: number;
  layout: number;
  title: string;
  summary: string;
  posts: BlogPost[];
};

export default function SenaraiCerita() {
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<BannerFormatted | null>(null);

  const [sectionsData, setSectionsData] = useState<SectionData[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const bannerData = await fetchBannerSenarai();
        setBanner(bannerData);

        const sections = await fetchSenaraiSections();

        const final = [];

        for (const sec of sections) {
          const featured = await fetchFeaturedBySection(sec.id);
          const list = await fetchSenaraisBySection(sec.id);

          let filteredList = list;

          // 🟡 Layout 1 & 2 → buang featured
          if ((sec.order === 1 || sec.order === 2) && featured) {
            filteredList = list.filter((item) => item.id !== featured.id);
          }

          const mapped = filteredList.map(mapSenaraiToBlogPost);
          const mappedFeatured = featured
            ? mapSenaraiToBlogPost(featured)
            : null;

          let combinedPosts: BlogPost[] = [];

          // 🟡 Layout 1 & 2 → ada featured
          if (sec.order === 1 || sec.order === 2) {
            combinedPosts = mappedFeatured
              ? [mappedFeatured, ...mapped]
              : mapped;
          }

          // 🔵 Layout 3 & 4 → list utuh, tidak pakai featured sama sekali
          else if (sec.order === 3 || sec.order === 4) {
            combinedPosts = mapped;
          }

          final.push({
            sectionId: sec.id,
            layout: sec.order,
            title: sec.title,
            summary: sec.summary ?? "",
            posts: combinedPosts,
          });
        }

        setSectionsData(final);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <SkeletonBanner />;

  return (
    <div>
      {/* Banner */}
      <section
        ref={ref}
        className="relative bg-[#F0ACCF] h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start xl:items-center overflow-hidden mt-[85px]"
        style={{ backgroundColor: banner?.bgColor ?? "#F0ACCF" }}
      >
        <div className="container mx-auto px-3 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="max-w-[466px] text-primary">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: isSmall ? 35 : 60 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[48px] md:text-8xl font-bruliafont leading-[120%] mb-12 sm:mb-0"
            >
              {banner?.title ?? "Senarai Cerita"}
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={loading ? false : { opacity: 0, x: 200 }}
          animate={loading ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[530px] xl:h-[800px] -bottom-5 sm:bottom-0"
        >
          <Image
            src={banner?.imageBackground ?? "/assets/Senarai-cerita-bg-2.png"}
            alt="Ornament"
            fill
            className="object-cover sm:object-contain object-center sm:object-right"
          />
        </motion.div>
      </section>

      {/* Render Sections Dinamis */}
      {sectionsData.map((sec) => {
        switch (sec.layout) {
          case 1:
          case 2:
            return (
              <BlogSenarai
                key={sec.sectionId}
                posts={sec.posts}
                title={sec.title}
                summary={sec.summary}
              />
            );

          case 3:
            return (
              <BlogSenaraiTwo
                key={sec.sectionId}
                posts={sec.posts}
                title={sec.title}
                summary={sec.summary}
              />
            );

          case 4:
            return (
              <BlogSenaraiFour
                key={sec.sectionId}
                posts={sec.posts}
                title={sec.title}
                summary={sec.summary}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
