"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Kolaborasi() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative bg-[#729E81] min-h-[900px] overflow-hidden py-18 z-10"
    >
      {/* Ornament bawah */}
      <div className="absolute inset-0 -top-[150px] bg-[url('/assets/bg-oranament.png')] bg-no-repeat bg-cover opacity-70 z-0"></div>

      {/* ======================= */}
      {/* DESKTOP VERSION */}
      {/* ======================= */}
      <div className="hidden lg:block relative max-w-7xl mx-auto z-10 px-6 xl:px-14">
        <div className="relative w-full flex justify-center">
          {/* Foto kiri */}
          <motion.div
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={inView ? { rotate: 3, scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 1.5,
              delay: 1.5,
              type: "spring",
              bounce: 0.3,
            }}
            className="absolute left-0 top-0 z-10"
          >
            <div className="bg-white w-[435px] px-4 pt-4 pb-16 shadow-xl">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-1new.jpg"
                  alt="Foto Kolaborasi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Foto kanan */}
          <motion.div
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={inView ? { rotate: -3, scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 1.5,
              delay: 1.7,
              type: "spring",
              bounce: 0.3,
            }}
            className="absolute right-0 top-0 z-10"
          >
            <div className="bg-white w-[435px] px-4 pt-4 pb-16 shadow-xl">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-3new.jpg"
                  alt="Foto Raya"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Foto tengah */}
          <motion.div
            initial={{ y: 120, opacity: 0, scale: 0.9 }}
            animate={inView ? { y: 200, opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1.5,
              delay: 1.9,
              type: "spring",
              bounce: 0.25,
            }}
            className="relative z-20"
          >
            <div className="bg-white w-[435px] px-4 pt-4 pb-16 shadow-xl">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-2.jpg"
                  alt="Foto Eksperimentasi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Teks PNG */}
        <div className="absolute left-0 2xl:-left-16 top-[340px] z-30 -space-y-12">
          {[
            {
              src: "/assets/Kolaborasi.png",
              alt: "Kolaborasi",
              w: 410,
              h: 168,
              ml: "",
            },
            {
              src: "/assets/Exsperimentasi.png",
              alt: "Eksperimentasi",
              w: 480,
              h: 174,
              ml: "ml-6",
            },
            {
              src: "/assets/Raya.png",
              alt: "Raya",
              w: 173,
              h: 115,
              ml: "ml-15",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.alt}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 1,
                delay: idx * 0.5,
                type: "spring",
                bounce: 0.35,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                className={`pointer-events-none select-none ${item.ml}`}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 1,
              delay: 2.4,
              type: "spring",
              bounce: 0.35,
            }}
          >
            <Image
              src="/assets/underline-shadowtxt.png"
              alt="underline"
              width={173}
              height={115}
              className="pointer-events-none select-none ml-15"
            />
          </motion.div>
        </div>

        {/* Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="absolute -bottom-[410px] xl-bottom-[350px] right-6 2xl:right-0 max-w-md xl:max-w-sm z-20"
        >
          <p className="text-[#FFFBE9] text-2xl leading-[29px] text-right">
            Dijalankan atas tiga pilar; kolaborasi, eksperimentasi, dan raya,
            Kolaboraya percaya perubahan sistemik lahir dari kesediaan melebur
            sekat, melepas paham, menjajal gagasan baru, dan bergerak bersama.
          </p>
        </motion.div>
      </div>

      {/* ======================= */}
      {/* MOBILE VERSION */}
      {/* ======================= */}
      <div className="block lg:hidden relative z-10 px-6 sm:pt-10">
        <div className="flex flex-col">
          {/* Foto kiri */}
          <motion.div
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={inView ? { rotate: 2, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="self-start rotate-2"
          >
            <div className="bg-white w-[60vw] sm:w-[85vw] max-w-[430px] px-3 pt-3 pb-8 shadow-lg">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-1new.jpg"
                  alt="Foto Kolaborasi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Foto kanan */}
          <motion.div
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={inView ? { rotate: -3, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="self-end -rotate-3 -mt-12 sm:-mt-20"
          >
            <div className="bg-white w-[60vw] sm:w-[85vw] max-w-[430px] px-3 pt-3 pb-8 shadow-lg">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-3new.jpg"
                  alt="Foto Raya"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Foto tengah */}
          <motion.div
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={inView ? { rotate: 2, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="rotate-2 -mt-8 sm:-mt-16"
          >
            <div className="bg-white w-[60vw] sm:w-[85vw] max-w-[430px] px-3 pt-3 pb-8 shadow-lg">
              <div className="relative aspect-[396.72/244.5] w-full">
                <Image
                  src="/assets/kolaborasi-foto-2.jpg"
                  alt="Foto Eksperimentasi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Teks PNG */}
        {/* Teks PNG */}
        <div className="mt-6 sm:mt-10 flex flex-col space-y-[-27px]">
          {[
            {
              src: "/assets/Kolaborasi.png",
              alt: "Kolaborasi",
              w: 250,
              h: 100,
              ml: "",
            },
            {
              src: "/assets/Exsperimentasi.png",
              alt: "Eksperimentasi",
              w: 300,
              h: 110,
              ml: "ml-5",
            },
            {
              src: "/assets/Raya.png",
              alt: "Raya",
              w: 105,
              h: 90,
              ml: "ml-10",
            },
            {
              src: "/assets/underline-shadowtxt.png",
              alt: "underline",
              w: 105,
              h: 80,
              ml: "ml-12",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.alt}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.9 + idx * 0.3, // muncul bergantian
                type: "spring",
                bounce: 0.3,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                className={`pointer-events-none select-none ${item.ml}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="relative mt-5 sm:mt-0 sm:absolute bottom-0 sm:bottom-8 -right-7 xs:-right-20 sm:right-8 max-w-[290px] sm:max-w-sm z-20"
        >
          <p className="text-[#FFFBE9] text-xl leading-[24px] text-right">
            Dijalankan atas tiga pilar; kolaborasi, eksperimentasi, dan raya,
            Kolaboraya percaya perubahan sistemik lahir dari kesediaan melebur
            sekat, melepas paham, menjajal gagasan baru, dan bergerak bersama.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
