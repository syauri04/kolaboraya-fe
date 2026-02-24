"use client";

import Image from "next/image";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Category } from "@/types/category";

type CategoryProps = {
  category: Category[];
};

export default function ProdukKolaborasi({ category }: CategoryProps) {
  const products = [
    {
      id: 1,
      title: "MODUL",
      image: "/assets/produk-modul.png",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: false,
    },
    {
      id: 2,
      title: "ALAT BANTU",
      image: "/assets/produk-alat.png",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: false,
    },
    {
      id: 3,
      title: "AUDIO VISUAL",
      image: "/assets/audio-visual.png",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: true,
    },
  ];

  // Animasi & inView setup
  const controls = useAnimation();

  // Threshold responsive
  const [thresholdValue, setThresholdValue] = useState(0.5);

  useEffect(() => {
    const updateThreshold = () => {
      if (window.innerWidth <= 768) {
        setThresholdValue(0.2); // mobile lebih sensitif
      } else {
        setThresholdValue(0.5);
      }
    };

    updateThreshold();
    window.addEventListener("resize", updateThreshold);
    return () => window.removeEventListener("resize", updateThreshold);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: thresholdValue,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Motion Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 140 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.4 } },
  };

  const fadeBottom: Variants = {
    hidden: { opacity: 0, y: 140 },
    visible: { opacity: 1, y: 90, transition: { duration: 1.4 } },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.45, delayChildren: 0.18 },
    },
  };

  // Dragable slider
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(
        containerRef.current.scrollWidth - containerRef.current.offsetWidth,
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#C8DDC1] py-18 sm:py-20 min-h-[1000px] sm:min-h-[1329px] lg:min-h-[800px] overflow-hidden"
    >
      {/* Ornament kanan atas */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        animate={controls}
        className="absolute -top-20 -right-24 z-0 pointer-events-none"
      >
        <div className="relative w-[210px] h-[210px] sm:w-[340px] sm:h-[247px]">
          <Image
            src="/assets/ornament-flower.png"
            alt="ornament kanan atas"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </motion.div>

      {/* Ornament kiri bawah */}
      <motion.div
        variants={fadeBottom}
        initial="hidden"
        animate={controls}
        className="absolute bottom-0 sm:-bottom-20 right-20 lg:right-0 z-0 pointer-events-none"
      >
        <Image
          src="/assets/ornament-produk.png"
          alt="ornament kiri bawah"
          width={600}
          height={555}
          className="scale-x-[-1]"
        />
      </motion.div>

      <div className="relative container mx-auto grid grid-cols-1 px-3 sm:px-6 z-10">
        {/* Title kiri */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="text-left"
        >
          <h2 className="text-5xl  sm:text-8xl font-bruliafont text-primary leading-[120%] sm:leading-[1.2]">
            Produk Kolaborasi
          </h2>
        </motion.div>

        {/* List Produk */}
        <div className="pt-12">
          {/* 🖥️ Desktop (≥1024px) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="hidden lg:grid grid-cols-3 gap-10 xl:pr-[280px]"
          >
            {category?.map((cat) => (
              <motion.article
                key={cat.id}
                variants={fadeUp}
                className="flex flex-col"
                aria-labelledby={`produk-title-${cat.id}`}
              >
                {/* Gambar produk */}
                <div className="relative rounded-t-[50px] w-full aspect-square overflow-hidden">
                  <Image
                    src={
                      cat.image?.url
                        ? `${cat.image.url}`
                        : "/assets/placeholder.png"
                    }
                    alt={cat.Category}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title background */}
                <div className="relative -mt-6 z-10">
                  <div className="relative flex items-center justify-center">
                    <Image
                      src="/assets/ornament-card-produk.png"
                      alt="title background"
                      width={500}
                      height={80}
                      className="w-full h-[60px] md:h-[80px] object-cover"
                    />
                    <h3
                      id={`produk-title-${cat.id}`}
                      className="absolute text-white font-bruliafont text-4xl uppercase tracking-wide"
                    >
                      {cat.Category}
                    </h3>
                  </div>
                </div>

                {/* Summary */}
                {/* <div className="mt-4">
                  <p className="text-primary text-2xl leading-[29px] mb-4">
                    {item.summary}
                  </p>
                </div> */}
              </motion.article>
            ))}
          </motion.div>

          {/* 📱 Mobile & Tablet (<1024px) */}
          <div className="block lg:hidden overflow-hidden cursor-grab active:cursor-grabbing -mx-6">
            <motion.div
              ref={containerRef}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              dragElastic={0.25}
              className="flex space-x-4"
            >
              {category?.map((cat) => (
                <motion.article
                  key={cat.id}
                  whileTap={{ scale: 0.97 }}
                  className="w-[310px] sm:w-[290px] flex-shrink-0 flex flex-col ml-6"
                  aria-labelledby={`produk-title-${cat.id}`}
                >
                  {/* Gambar produk */}
                  <div className="relative rounded-t-[40px] w-full aspect-square overflow-hidden">
                    <Image
                      src={
                        cat.image?.url
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${cat.image.url}`
                          : "/assets/placeholder.png"
                      }
                      alt={cat.Category}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title background */}
                  <div className="relative -mt-6 z-10">
                    <div className="relative flex items-center justify-center">
                      <Image
                        src="/assets/ornament-card-produk.png"
                        alt="title background"
                        width={500}
                        height={80}
                        className="w-full h-[60px] object-cover"
                      />
                      <h3
                        id={`produk-title-${cat.id}`}
                        className="absolute text-white font-bruliafont text-3xl uppercase tracking-wide"
                      >
                        {cat.Category}
                      </h3>
                    </div>
                  </div>

                  {/* Summary */}
                  {/* <div className="mt-4">
                    <p className="text-primary text-lg sm:text-xl leading-[120%] sm:leading-[26px] mb-4">
                      {item.summary}
                    </p>
                  </div> */}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
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
        <div className="flex justify-start mt-8 sm:mt-20">
          <Link
            href="/produk-kolaborasi"
            className="bg-[#386366] cursor-pointer text-white text-2xl font-bruliafont px-6 py-3 rounded-lg hover:bg-[#7b91c8] transition"
          >
            Selengkapnya
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
