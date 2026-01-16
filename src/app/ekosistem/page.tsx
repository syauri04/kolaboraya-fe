"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import Link from "next/link";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useResponsiveRadius } from "@/hooks/useResponsiveRadius";

const ANIMATION = {
  duration: 0.7,
  ease: cubicBezier(0.4, 0, 0.2, 1),
};

const LOAD_ANIMATION = {
  duration: 0.9,
  ease: cubicBezier(0.22, 1, 0.36, 1),
};

const items = [
  {
    label: "Ekosistem Ekonomi",
    slug: "ekonomi",
    bg: "#BB0D55",
    angle: 270,
  },
  {
    label: "Ekosistem Teknologi",
    slug: "teknologi",
    bg: "#6E87A8",
    angle: 330,
  },
  {
    label: "Ekosistem Ekologi",
    slug: "ekologi",
    bg: "#1F5A3D",
    angle: 30,
  },
  {
    label: "Ekosistem Sosial",
    slug: "sosial",
    bg: "#FF6807",
    angle: 90,
  },
  {
    label: "Ekosistem Budaya",
    slug: "budaya",
    bg: "#DD96B7",
    angle: 150,
  },
  {
    label: "Ekosistem Politik",
    slug: "politik",
    bg: "#EDB133",
    angle: 210,
  },
];

export default function EkosistemPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(false);
  const radius = useResponsiveRadius();

  return (
    <section className="relative py-20 mt-[85px] overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">
        {/* ================= TEXT AREA ================= */}
        <div className="max-w-full justify-center text-center">
          <motion.h1
            initial={mounted ? false : { y: -40, opacity: 0 }}
            animate={{
              y: open ? -40 : 0,
              opacity: open ? 0 : 1,
              height: open ? 0 : "auto",
            }}
            transition={mounted ? ANIMATION : LOAD_ANIMATION}
            className="font-bruliafont font-bold text-black text-5xl md:text-7xl leading-relaxed md:leading-[90px] overflow-hidden"
            style={{
              pointerEvents: open ? "none" : "auto",
            }}
          >
            6 Ekosistem Raya
          </motion.h1>

          <motion.p
            initial={mounted ? false : { y: -24, opacity: 0 }}
            animate={
              isDesktop
                ? { y: open ? -16 : 0, opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            transition={{
              ...(mounted ? ANIMATION : LOAD_ANIMATION),
              delay: mounted ? 0 : 0.25,
            }}
            style={
              isDesktop
                ? {
                    width: open ? 423 : "100%",
                    textAlign: open ? "left" : "center",
                    position: open ? "absolute" : "relative",
                  }
                : {
                    width: "100%",
                    textAlign: "center",
                    position: "relative",
                  }
            }
            className="lg:mt-6 max-w-full font-semibold text-base md:text-xl leading-relaxed md:leading-7 text-black"
          >
            Enam ekosistem raya yang lahir dari perhelatan Pasar Kolaboraya
            2025. Ketuk untuk melihat deskripsi ekosistem, Ecosystem Builder
            yang membangun dan merawat ekosistem, serta aksi kolektif yang
            digagas bersama pada Pasar Kolaboraya 2025.
          </motion.p>
        </div>

        {/* ================= ECOSYSTEM AREA ================= */}
        <div className="relative  md:py-20 flex justify-center">
          <motion.div
            animate={{
              width: open ? 520 : 188,
              height: open ? 520 : 188,
            }}
            transition={ANIMATION}
            className="relative flex items-center justify-center"
          >
            {/* DASH & LINES */}
            <AnimatePresence>
              {open && (
                <>
                  {/* DASH CIRCLE */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={ANIMATION}
                    className="absolute w-[300px] md:w-[520px] h-[300px] md:h-[520px] rounded-full
                       border-3 border-dashed border-black pointer-events-none"
                  />

                  {/* RADIAL DASH */}
                  {items.map((item, i) => (
                    <DashLine key={i} angle={item.angle} radius={radius} />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* CENTER CIRCLE */}
            <div
              onClick={() => setOpen(!open)}
              className="z-20 w-36 md:w-[188px] h-36 md:h-[188px] rounded-full bg-[#343D66]
                 flex items-center justify-center text-center cursor-pointer"
            >
              <span className="text-base md:text-[22px] leading-relaxed md:leading-[27px] font-bruliafont font-bold text-[#FFFBE9]">
                Ekosistem Raya
              </span>
            </div>

            {/* ORBIT CIRCLES */}
            <AnimatePresence>
              {open &&
                items.map((item, index) => {
                  const x = radius * Math.cos((item.angle * Math.PI) / 180);
                  const y = radius * Math.sin((item.angle * Math.PI) / 180);

                  return (
                    <motion.div
                      key={index}
                      initial={{ x: 0, y: 0 }}
                      animate={{ x, y }}
                      exit={{ x: 0, y: 0 }}
                      transition={ANIMATION}
                      className="absolute w-36 md:w-[188px] h-36 md:h-[188px] rounded-full
                         flex items-center justify-center text-center z-10"
                      style={{ backgroundColor: item.bg }}
                    >
                      <Link
                        href={`/ekosistem/${item.slug}`}
                        className="block w-36 md:w-[188px] h-36 md:h-[188px] rounded-full
                       flex items-center justify-center text-center
                       cursor-pointer"
                        style={{ backgroundColor: item.bg }}
                      >
                        <span className="text-base md:text-[22px] leading-relaxed md:leading-[27px] font-bruliafont font-bold text-white px-4">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashLine({ angle, radius }: { angle: number; radius: number }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: radius }}
      exit={{ width: 0 }}
      transition={ANIMATION}
      className="absolute left-1/2 top-1/2 h-[2px]
                 border-t-3 border-dashed border-black origin-left"
      style={{ transform: `rotate(${angle}deg)` }}
    />
  );
}
