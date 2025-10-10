"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type HeroProps = {
  summary: string;
  title?: string;
};

export default function Hero({ title, summary }: HeroProps) {
  const { ref: logoRef, inView: logoInView } = useInView({ triggerOnce: true });
  const { ref: frameRef, inView: frameInView } = useInView({ triggerOnce: true });

  return (
    <section className="relative h-[1024px] flex flex-col justify-center items-center z-0 overflow-hidden">
      {/* Background  */}
      <div className="absolute inset-0 flex">
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0 }} className="w-1/4 bg-[url('/assets/bg1.png')] bg-cover bg-center" />
        <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="w-1/4 bg-[url('/assets/bg2.png')] bg-cover bg-center" />
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} className="w-1/4 bg-[url('/assets/bg3.png')] bg-cover bg-center" />
        <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} className="w-1/4 bg-[url('/assets/bg4.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <motion.div ref={logoRef} initial={{ y: 100, opacity: 0 }} animate={logoInView ? { y: -90, opacity: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 1 }} className="relative z-10 text-center">
        <Image src="/assets/logo-shadow.png" alt="Kolaboraya Logo" width={1280} height={512} className="mx-auto drop-shadow-lg" priority />
      </motion.div>

      {/* Frame putih */}
      <motion.div ref={frameRef} initial={{ y: 100, opacity: 0 }} animate={frameInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} className="absolute bottom-0 left-0 w-full z-20">
        <div className="container mx-auto px-6">
          <div className="bg-[#FFFBE9] rounded-t-[60px] px-20 py-14 text-center">
            {title && <h2 className="text-[64px] font-bruliafont text-primary mb-4">{title}</h2>}
            <p className="text-gray-700 text-lg">{summary}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
