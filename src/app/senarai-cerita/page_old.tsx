"use client";

import BlogSenarai, { BlogPost } from "@/components/BlogSenarai";
import SkeletonBanner from "@/components/SkeletonBanner";
import { fetchBannerSenarai } from "@/services/banner";
import { BannerFormatted } from "@/types/banner";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchFeaturedSenarai, fetchSenarais } from "@/services/senarai";
import { SenaraiItem } from "@/types/senarai";

function mapSenaraiToBlogPost(item: SenaraiItem): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary ?? "",
    image: item.image?.url
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image?.url}`
      : "/assets/placeholder.png",
    date: new Date(item.publishedAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    featured: item.featured,
  };
}

export default function SenaraiCerita() {
  const [banner, setBanner] = useState<BannerFormatted | null>(null);
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmall(window.innerWidth < 640); // < sm
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const bannerData = await fetchBannerSenarai();
        setBanner(bannerData);

        const [allSenarais, featuredSenarai] = await Promise.all([
          fetchSenarais(),
          fetchFeaturedSenarai(),
        ]);

        const mappedAll = allSenarais.map(mapSenaraiToBlogPost);

        let finalPosts: BlogPost[] = mappedAll;

        if (featuredSenarai) {
          const featuredMapped = mapSenaraiToBlogPost(featuredSenarai);

          // Hilangkan duplicate featured dari list
          const others = mappedAll.filter(
            (p) => p.slug !== featuredSenarai.slug
          );

          finalPosts = [featuredMapped, ...others];
        }

        setPosts(finalPosts);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <SkeletonBanner />;

  return (
    <div>
      <section
        ref={ref}
        className="relative bg-[#F0ACCF] h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start xl:items-center overflow-hidden mt-[85px]"
        style={{ backgroundColor: banner?.bgColor ?? "#F0ACCF" }}
      >
        <div className="container mx-auto px-3 sm:px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
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

        {/* Ornament Image */}
        <motion.div
          initial={loading ? false : { opacity: 0, x: 200 }}
          animate={loading ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[530px] xl:h-[800px] -bottom-5 sm:bottom-0 "
        >
          <Image
            src={banner?.imageBackground ?? "/assets/Senarai-cerita-bg-2.png"}
            alt="Ornament"
            fill
            className="object-cover sm:object-contain object-center sm:object-right "
          />
        </motion.div>
      </section>

      <BlogSenarai posts={posts} />
    </div>
  );
}
