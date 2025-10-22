"use client";

import Image from "next/image";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ProdukKolaborasi() {
  const products = [
    {
      id: 1,
      title: "MODUL",
      image: "/assets/produk-modul.png",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: false,
    },
    {
      id: 2,
      title: "ALAT BANTU",
      image: "/assets/produk-alat.png",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: true,
    },
  ];

  // Animasi & inView setup
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Variants (TS-friendly) — tidak memakai `ease` yang bermasalah
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2 }, // lebih lambat -> santai
    },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 140 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.4 },
    },
  };

  const fadeBottom: Variants = {
    hidden: { opacity: 0, y: 140 },
    visible: {
      opacity: 1,
      y: 90,
      transition: { duration: 1.4 },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.45, // lambat, bergantian santai
        delayChildren: 0.18,
      },
    },
  };

  return (
    <section ref={ref} className="relative bg-[#C8DDC1] py-20 min-h-[800px] overflow-hidden">
      {/* Ornament kanan atas */}
      <motion.div variants={fadeRight} initial="hidden" animate={controls} className="absolute -top-20 -right-24 z-0 pointer-events-none">
        <Image src="/assets/ornament-flower.png" alt="ornament kanan atas" width={340} height={340} />
      </motion.div>

      {/* Ornament kiri bawah */}
      <motion.div variants={fadeBottom} initial="hidden" animate={controls} className="absolute -bottom-20 left-10 z-0 pointer-events-none">
        <Image src="/assets/ornament-produk.png" alt="ornament kiri bawah" width={700} height={600} />
      </motion.div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 z-10">
        {/* Title kiri */}
        <motion.div variants={fadeUp} initial="hidden" animate={controls} className="text-center md:text-left">
          <h2 className="text-6xl md:text-8xl font-bruliafont text-primary leading-[1.2]">
            Produk <br className="hidden md:block" /> Kolaborasi
          </h2>
        </motion.div>

        {/* List produk */}
        <motion.div variants={staggerContainer} initial="hidden" animate={controls} className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {products.map((item) => (
            <motion.article key={item.id} variants={fadeUp} className="flex flex-col" aria-labelledby={`produk-title-${item.id}`}>
              {/* Gambar produk */}
              <div className="relative rounded-t-[50px] w-full aspect-square overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              {/* Title dengan background */}
              <div className="relative -mt-6 z-10">
                <div className="relative flex items-center justify-center">
                  <Image src="/assets/ornament-card-produk.png" alt="title background" width={500} height={80} className="w-full h-[60px] md:h-[80px] object-cover" />
                  <h3 id={`produk-title-${item.id}`} className="absolute text-white font-bruliafont text-4xl md:text-[40px] uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4">
                <p className="text-primary text-lg leading-[22px] mb-4">{item.summary}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Tombol Selengkapnya */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
        }}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-6"
      >
        <div className="flex justify-end mt-20">
          <button className="bg-[#386366] text-white text-2xl font-bruliafont px-6 py-3 rounded-lg hover:bg-[#7b91c8] transition">Selengkapnya</button>
        </div>
      </motion.div>
    </section>
  );
}
