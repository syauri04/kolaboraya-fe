"use client";

import BlogSenarai from "@/components/BlogSenarai";
import { blogs } from "@/data/blog";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SenaraiCerita() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div>
      <section ref={ref} className="relative bg-[#F0ACCF] h-[715px] flex items-center overflow-hidden mt-[85px]">
        <div className="container mx-auto px-6  grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
          <div className="max-w-[466px] text-primary">
            <motion.h2 initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className="text-8xl font-bruliafont leading-[120%] ">
              Senarai <br />
              Cerita
            </motion.h2>
          </div>

          {/* Spacer untuk mobile agar gambar turun */}
          <div className="block md:hidden h-12" />
        </div>

        {/* Ornament Image */}
        <motion.div initial={{ opacity: 0, x: 200 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="absolute w-full h-[800px] ">
          <Image
            src="/assets/Senarai-cerita-bg.png" // ganti dengan path ornament image kamu
            alt="Ornament"
            fill
            className="object-contain object-right"
          />
        </motion.div>
      </section>

      <BlogSenarai posts={blogs} />
    </div>
  );
}
