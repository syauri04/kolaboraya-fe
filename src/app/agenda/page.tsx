"use client";

import ListAgenda from "@/components/ListAgenda";
import SkeletonBanner from "@/components/SkeletonBanner";
import { fetchAgendaCategories, fetchAgendas } from "@/services/agenda";
import { fetchBannerAgenda } from "@/services/banner";
import { AgendaItem } from "@/types/agenda";
import { BannerFormatted } from "@/types/banner";
import { Category } from "@/types/category";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Agenda() {
  const [banner, setBanner] = useState<BannerFormatted | null>(null);
  const [loading, setLoading] = useState(true);

  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
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
        const bannerData = await fetchBannerAgenda();
        const agendaData = await fetchAgendas();
        const categoryData = await fetchAgendaCategories();

        setBanner(bannerData);
        setAgendas(agendaData);
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
        className="relative h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start xl:items-center overflow-hidden mt-[85px]"
        style={{ backgroundColor: banner?.bgColor ?? "#EDB133" }}
      >
        <div className="container mx-auto px-3 sm:px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
          <div className="max-w-[466px] text-primary">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: isSmall ? 35 : 60 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[48px] md:text-8xl font-bruliafont leading-[120%] mb-12 sm:mb-0 "
            >
              {banner?.title ?? "Agenda Ekosistem"}
            </motion.h2>
          </div>
        </div>

        {/* Ornament Image */}
        <motion.div
          initial={loading ? false : { opacity: 0, x: 200 }}
          animate={loading ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[530px] xl:h-[800px] bottom-0 "
        >
          <Image
            src={banner?.imageBackground ?? "/images/ornament-agenda.png"}
            alt="Ornament"
            fill
            className="object-cover sm:object-contain object-center sm:object-right"
          />
        </motion.div>
      </section>

      <ListAgenda agendas={agendas} categories={categories} />
    </div>
  );
}
