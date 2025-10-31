"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

type HeroProps = {
  summary: string;
  title?: string;
  page?: string;
};

export default function Hero({ title, summary, page }: HeroProps) {
  const { ref: logoRef, inView: logoInView } = useInView({ triggerOnce: true });

  // Tentukan properti berdasarkan halaman
  const isHome = page === "home";
  const imageWidth = isHome ? 1080 : 816;
  const imageHeight = isHome ? 512 : 311;
  const animateConfig = isHome ? { y: -90, opacity: 1 } : { y: -140, opacity: 1 };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center z-0 overflow-hidden mt-[85px]">
      {/* Background */}
      <div className="absolute inset-0 flex flex-wrap">
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0 }} className="w-1/2 lg:w-1/4 bg-[url('/assets/bg1.png')] bg-cover bg-center" />
        <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="w-1/2 lg:w-1/4 bg-[url('/assets/bg2.png')] bg-cover bg-center" />
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} className="w-1/2 lg:w-1/4 bg-[url('/assets/bg3.png')] bg-cover bg-center" />
        <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} className="w-1/2 lg:w-1/4 bg-[url('/assets/bg4.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <motion.div ref={logoRef} initial={{ y: 100, opacity: 0 }} animate={logoInView ? animateConfig : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 1 }} className="relative z-10 text-center">
        <Image src="/assets/logo-shadow.png" alt="Kolaboraya Logo" width={imageWidth} height={imageHeight} className="mx-auto drop-shadow-lg transition-all duration-700 ease-out" priority />
      </motion.div>

      {/* Frame putih (muncul setelah logo muncul) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={logoInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 2.4 }}
        className={`absolute bottom-0 left-0 z-20 ${isHome ? "max-w-5xl mx-auto right-0" : "w-full"}`}
      >
        <div className="container mx-auto px-6">
          <div className="bg-[#FFFBE9] rounded-t-[60px] px-14 lg:px-20 py-8 text-center">
            {isHome ? (
              <p className="font-bruliafont text-primary text-[40px]">{summary}</p>
            ) : (
              <>
                {title && <h2 className="text-[64px] font-bruliafont text-primary mb-4">{title}</h2>}
                <p className="text-gray-700 text-2xl leading-[29px] mb-8">{summary}</p>
                <Link href="https://www.roemahinspirit.id/" target="_blank" rel="noopener noreferrer" className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">
                  Tentang Roemah Inspirit
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
