"use client";

import Image from "next/image";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SenaraiSectionProps = {
  text: string;
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function SenaraiSection({
  text,
  showButton = false,
  buttonLabel = "Selengkapnya",
  buttonHref = "#",
}: SenaraiSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="relative bg-[#F0ACCF] pt-18 sm:pt-20 pb-18 sm:pb-20 lg:pb-12 overflow-hidden"
    >
      {/* ====== DESKTOP (>=768px) ====== */}
      <div className="hidden lg:block container mx-auto px-6">
        <div className="grid grid-cols-[40%_60%]">
          {/* Kolom kiri: oval kiri */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 1.4, ease: "easeOut" },
              },
            }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-[390px] xl:w-[434px] h-[302px] xl:h-[336px]">
              <Image
                src="/assets/Senarai-ovale.png"
                alt="Senarai Oval"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Kolom kanan */}
          <div className="flex justify-end relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                    delay: 0.1,
                  },
                },
              }}
              className="relative w-[550px] xl:w-[706px] h-[334px] xl:h-[430px] z-10"
            >
              <Image
                src="/assets/Senarai-board.png"
                alt="Senarai Board"
                fill
                className="object-cover"
              />

              <div className="absolute top-0 xl:-top-10 -left-30 space-y-[-5rem]">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.8,
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.35,
                      },
                    },
                  }}
                >
                  <Image
                    src="/assets/Senarai.png"
                    alt="Senarai"
                    width={367}
                    height={159}
                    className="pointer-events-none select-none w-[280px] xl:w-[367px]"
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.9,
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.35,
                      },
                    },
                  }}
                >
                  <Image
                    src="/assets/Cerita.png"
                    alt="Cerita"
                    width={321}
                    height={159}
                    className="pointer-events-none select-none w-[240px] xl:w-[321px] ml-44 mt-2"
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 1.2,
                        duration: 0.9,
                        type: "spring",
                        bounce: 0.35,
                      },
                    },
                  }}
                >
                  <Image
                    src="/assets/underline-shadowtxt.png"
                    alt="underline"
                    width={295}
                    height={80}
                    className="pointer-events-none select-none w-[220px] xl:w-[295px] ml-48 mt-12"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BLOK BAWAH */}
        <div className="grid grid-cols-[30%_70%] 2xl:grid-cols-[40%_60%] mt-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                y: 0,
                opacity: 1,
                transition: { delay: 1.6, duration: 0.8, ease: "easeOut" },
              },
            }}
            className="pr-20"
          >
            <p className="text-primary text-lg leading-[22px] mb-10 whitespace-pre-line">
              {text}
            </p>

            {showButton && (
              <a href={buttonHref}>
                <button className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">
                  {buttonLabel}
                </button>
              </a>
            )}
          </motion.div>

          {/* Gambar kanan */}
          <div className="flex justify-start relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                    delay: 0.25,
                  },
                },
              }}
              className="relative w-[550px] xl:w-[706px] h-[334px] xl:h-[430px] z-20 -top-10 xl:-top-20 ml-8 "
            >
              <Image
                src="/assets/Senarai-image2.png"
                alt="Senarai Image"
                fill
                className="object-cover"
              />

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={controls}
                variants={{
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 1.2,
                      ease: "easeOut",
                    },
                  },
                }}
                className="absolute -bottom-18 xl:-bottom-8 right-0 xl:-right-32"
              >
                <Image
                  src="/assets/Senarai-ovale.png"
                  alt="Senarai"
                  width={434}
                  height={336}
                  className="pointer-events-none select-none w-[390px] xl:w-[434px] h-[302px] xl:h-[336px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ====== MOBILE (<768px) ====== */}
      <div className="lg:hidden flex flex-col items-center px-3 sm:px-6 text-center relative overflow-hidden">
        {/* Ornamen Oval Kanan (belakang Senarai-board) */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            },
          }}
          className="absolute right-[-25px] top-[18px] sm:top-[40px] opacity-90 z-20"
        >
          <div className="relative w-[185px] h-[143px] sm:w-[320px] sm:h-[247px]">
            <Image
              src="/assets/Senarai-ovale.png"
              alt="Oval kanan"
              fill
              className="object-contain pointer-events-none select-none"
            />
          </div>
        </motion.div>

        {/* Ornamen Oval Kiri (belakang Senarai-image) */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
            },
          }}
          className="absolute left-[-35px] top-[198px] sm:top-[355px] opacity-90 z-20"
        >
          <div className="relative w-[185px] h-[143px] sm:w-[320px] sm:h-[247px]">
            <Image
              src="/assets/Senarai-ovale.png"
              alt="Oval kiri"
              fill
              className="object-contain pointer-events-none select-none"
            />
          </div>
        </motion.div>

        {/* Dua Foto Tumpuk (dengan posisi silang) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
            },
          }}
          className="relative  z-10 flex flex-col items-center w-full"
        >
          {/* Foto atas (kiri) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.8, ease: "easeOut" },
              },
            }}
            className="z-0 w-full"
          >
            <div className="relative w-[320px] sm:w-[513px] aspect-[513/313]">
              <Image
                src="/assets/Senarai-board.png"
                alt="Foto kanan atas"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>

          {/* Foto bawah (kanan) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 1, ease: "easeOut" },
              },
            }}
            className="-mt-14  z-10 w-full flex justify-end"
          >
            <div className="relative w-[320px] sm:w-[513px] aspect-[513/313]">
              <Image
                src="/assets/Senarai-image2.png"
                alt="Foto kiri bawah"
                fill
                className="object-cover "
                sizes="100vw"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Teks PNG “Senarai Cerita” */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, delay: 1.4 },
            },
          }}
          className="mt-10 flex justify-center items-center gap-12 relative z-10"
        >
          {/* “Senarai” di kiri */}
          <div className="flex flex-col items-start">
            <Image
              src="/assets/Senarai.png"
              alt="Senarai"
              width={280}
              height={80}
              className="object-contain"
            />
          </div>

          {/* “Cerita” di kanan + underline */}
          <div className="flex flex-col items-end relative">
            <Image
              src="/assets/Cerita.png"
              alt="Cerita"
              width={229}
              height={80}
              className="object-contain"
            />
            <Image
              src="/assets/underline-shadowtxt.png"
              alt="Underline"
              width={215}
              height={40}
              className="absolute bottom-[-18px] right-0"
            />
          </div>
        </motion.div>

        {/* Paragraf */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 1.8 },
            },
          }}
          className="text-[#2F2F2F] text-base leading-[22px] mt-6 mb-8 z-10"
        >
          {text}
        </motion.p>

        {/* Tombol */}
        {showButton && (
          <motion.a
            href={buttonHref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 2 },
              },
            }}
            className="z-10"
          >
            <button className="bg-[#386366] text-white text-base px-5 py-2 rounded-lg hover:bg-[#7b91c8] transition">
              {buttonLabel}
            </button>
          </motion.a>
        )}
      </div>
    </section>
  );
}
