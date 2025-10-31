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

export default function SenaraiSection({ text, showButton = false, buttonLabel = "Selengkapnya", buttonHref = "#" }: SenaraiSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.3, // lebih ringan agar animasi tetap jalan di layar kecil
    triggerOnce: true,
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="
        relative bg-[#F0ACCF] min-h-[800px] py-18 
        overflow-x-visible overflow-y-hidden
        xl:overflow-hidden
      "
    >
      <div className="container mx-auto px-6 flex flex-col gap-0">
        {/* BLOK ATAS */}
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
              <Image src="/assets/Senarai-ovale.png" alt="Senarai Oval" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Kolom kanan: board + text di atasnya */}
          <div className="flex justify-end relative">
            {/* Senarai-board */}
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
              <Image src="/assets/Senarai-board.png" alt="Senarai Board" fill className="object-cover" />

              {/* Teks di atas board (Senarai, Cerita, underline) */}
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
                  <Image src="/assets/Senarai.png" alt="Senarai" width={367} height={159} className="pointer-events-none select-none w-[280px] xl:w-[367px]" />
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
                  <Image src="/assets/Cerita.png" alt="Cerita" width={321} height={159} className="pointer-events-none select-none w-[240px] xl:w-[321px] ml-44 mt-2" />
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
                  <Image src="/assets/underline-shadowtxt.png" alt="underline" width={295} height={80} className="pointer-events-none select-none w-[220px] xl:w-[295px] ml-48 mt-12" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BLOK BAWAH */}
        <div className="grid grid-cols-[30%_70%] 2xl:grid-cols-[40%_60%]">
          {/* Kiri: teks muncul dari bawah */}
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
            <p className="text-primary text-lg leading-[22px] mb-10 whitespace-pre-line">{text}</p>

            {showButton && (
              <a href={buttonHref}>
                <button className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">{buttonLabel}</button>
              </a>
            )}
          </motion.div>

          {/* Kanan: Foto + oval kanan */}
          <div className="flex justify-start relative">
            {/* Foto utama */}
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
              className="relative w-[550px] xl:w-[706px] h-[334px] xl:h-[430px] z-20 -top-10 xl:-top-20 ml-8 shadow-[10px_14px_28px_rgba(78,57,28,0.28)]"
            >
              <Image src="/assets/Senarai-image.png" alt="Senarai Image" fill className="object-cover" />

              {/* Oval kanan */}
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
                <Image src="/assets/Senarai-ovale.png" alt="Senarai" width={434} height={336} className="pointer-events-none select-none w-[390px] xl:w-[434px] h-[302px] xl:h-[336px]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
