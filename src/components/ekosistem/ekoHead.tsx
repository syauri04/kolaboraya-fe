"use client";

import { motion } from "framer-motion";

type Props = {
  data: {
    title: string;
    backgroundImage: string;
    description: string;
    bgColor?: string;
  };
  theme?: string;
  textColor?: string;
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function EkoHead({ data, theme, textColor }: Props) {
  return (
    <section className="relative w-full md:h-[227px] py-10 md:py-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      />

      {/* Overlay / Blend Color */}
      {/* Overlay / Blend Color */}
      <div
        className="absolute inset-0 mix-blend-hard-light opacity-90"
        style={{
          backgroundColor: theme || "#CA3F34",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-3 sm:px-6 h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          {/* Left Text */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0,
            }}
            className={`text-[40px] lg:text-[60px] font-semibold leading-[48px] lg:leading-[72px] ${
              textColor ? `text-[${textColor}]` : "text-[#FFFBE9]"
            } max-w-[300px]`}
          >
            KLUSTER {data.title.toUpperCase()}
          </motion.h1>

          {/* Right Text */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.25,
            }}
            className={`max-w-[520px] text-base lg:text-xl font-semibold  lg:leading-[24px] text-left md:text-right ${
              textColor ? `text-[${textColor}]` : "text-[#FFFBE9]"
            }`}
          >
            {data.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
