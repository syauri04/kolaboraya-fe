"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type TentangSectionProps = {
  bgColor?: string;
  title: string;
  titleColor?: string;
  summary: string; // HTML string
  summaryColor?: string;
  image: string;
};

const TentangSection: React.FC<TentangSectionProps> = ({ bgColor = "#729E81", title, titleColor = "#000000", summary, summaryColor = "#5C5C5C", image }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  // Animasi container → stagger antar child
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.5 },
    },
  };

  // Animasi text
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  // Animasi image
  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 200, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="relative py-18 min-h-[800px]" style={{ backgroundColor: bgColor }}>
      <motion.div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {/* Text Content */}
        <div className="max-w-[466px]">
          <motion.h2 variants={textVariants} className="text-[64px] font-bruliafont leading-[90px] mb-6" style={{ color: titleColor }}>
            {title}
          </motion.h2>

          <motion.div variants={textVariants} className="text-lg leading-[25px]" style={{ color: summaryColor }} dangerouslySetInnerHTML={{ __html: summary }} />
        </div>

        {/* Spacer biar image turun di mobile */}
        <div className="block md:hidden h-12" />
      </motion.div>

      {/* Ornament Image */}
      <motion.div className="absolute bottom-0 right-0" variants={imageVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
        <Image src={image} alt="Ornament" width={1024} height={700} className="object-contain" />
      </motion.div>
    </section>
  );
};

export default TentangSection;
