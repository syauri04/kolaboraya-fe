"use client";

import ListProduk from "@/components/ListProduk";
import SkeletonBanner from "@/components/SkeletonBanner";
import { fetchBannerProduk } from "@/services/banner";
import { fetchProdukCategories, fetchProduks } from "@/services/produk";
import { BannerFormatted } from "@/types/banner";
import { Category } from "@/types/category";
import { ProdukItem } from "@/types/produk";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProdukKolaborasi() {
  const [banner, setBanner] = useState<BannerFormatted | null>(null);
  const [loading, setLoading] = useState(true);

  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
        const bannerData = await fetchBannerProduk();
        const produkData = await fetchProduks();
        const categoryData = await fetchProdukCategories();

        setBanner(bannerData);
        setProduks(produkData);
        setCategories(categoryData);
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
        className="relative   h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start overflow-hidden mt-[85px]"
        style={{ backgroundColor: banner?.bgColor ?? "#729E81" }}
      >
        <div className="container mx-auto px-3 sm:px-6  relative z-10">
          {/* Text Content di bawah kiri */}
          <div className="max-w-[466px] text-primary">
            <motion.h2
              initial={loading ? false : { opacity: 0, y: -100 }}
              animate={loading ? {} : { opacity: 1, y: isSmall ? 35 : 60 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[48px] md:text-8xl font-bruliafont leading-[120%] mb-12 sm:mb-0"
            >
              {banner?.title ?? "Produk Kolaborasi"}
            </motion.h2>
          </div>
        </div>

        {/* Ornament Background Atas */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[415px] xl:h-[550px] bottom-0 sm:-bottom-13 lg:bottom-0"
        >
          <Image
            src={banner?.imageBackground ?? "/assets/bg-produk2.png"}
            alt="Ornament"
            fill
            className="object-cover sm:object-contain object-left sm:object-right"
          />
        </motion.div>

        {/* Ornament Tambahan di pojok kanan bawah */}
        {/* <motion.div initial={{ opacity: 0, x: 200, y: 200 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="absolute bottom-0 right-0 w-[600px] h-[500px]">
          <Image
            src="/assets/ornament-produk-hero.png" // ganti dengan path ornament barumu
            alt="Ornament bawah"
            fill
            className="object-contain object-right"
          />
        </motion.div> */}
      </section>

      <ListProduk produks={produks} categories={categories} />
    </div>
  );
}
