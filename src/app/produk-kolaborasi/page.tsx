"use client";

import ListProduk from "@/components/ListProduk";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function ProdukKolaborasi() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div>
      <section ref={ref} className="relative bg-[#729E81] h-[1024px] flex items-end overflow-hidden mt-[85px]">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Text Content di bawah kiri */}
          <div className="max-w-[466px] text-primary">
            <motion.h2 initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: -90 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className="text-8xl font-bruliafont leading-[120%]">
              Produk <br />
              Kolaborasi
            </motion.h2>
          </div>
        </div>

        {/* Ornament Background Atas */}
        <motion.div initial={{ opacity: 0, y: -200 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="absolute inset-0">
          <Image src="/assets/bg-produk.png" alt="Ornament" fill className="object-contain object-right" />
        </motion.div>

        {/* Ornament Tambahan di pojok kanan bawah */}
        <motion.div initial={{ opacity: 0, x: 200, y: 200 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="absolute bottom-0 right-0 w-[600px] h-[500px]">
          <Image
            src="/assets/ornament-produk-hero.png" // ganti dengan path ornament barumu
            alt="Ornament bawah"
            fill
            className="object-contain object-right"
          />
        </motion.div>
      </section>

      <ListProduk />
    </div>
  );
}
