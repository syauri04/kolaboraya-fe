"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

type TentangSectionProps = {
  bgColor?: string;
  title: string;
  titleColor?: string;
  summary: string; // HTML string
  summaryColor?: string;
  image: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
};

const TentangSection: React.FC<TentangSectionProps> = ({
  bgColor = "#729E81",
  title,
  titleColor = "#000000",
  summary,
  summaryColor = "#5C5C5C",
  image,
}) => {
  // Threshold responsive
  const [thresholdValue, setThresholdValue] = useState(0.5);

  useEffect(() => {
    const updateThreshold = () => {
      if (window.innerWidth <= 768) {
        setThresholdValue(0.3); // mobile lebih sensitif
      } else {
        setThresholdValue(0.7);
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
    <section
      ref={ref}
      className="relative pt-18 pb-0 lg:py-18 min-h-[600px] md:min-h-[800px]"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="container mx-auto px-3 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Text Content */}
        <div className="w-full lg:max-w-[466px]">
          <motion.h2
            variants={textVariants}
            className="text-[48px] md:text-[64px] font-bruliafont leading-[60px] md:leading-[90px] mb-6"
            style={{ color: titleColor }}
          >
            {title}
          </motion.h2>

          <motion.div
            variants={textVariants}
            className="text-lg md:text-2xl leading-[120%] md:leading-[29px]"
            style={{ color: summaryColor }}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>

        {/* Spacer biar image turun di mobile */}
        <div className="block md:hidden h-0" />
      </motion.div>

      {/* Ornament Image */}
      <motion.div
        className="relative lg:absolute lg:bottom-0 lg:right-0"
        variants={imageVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image?.url}`}
          alt={image?.alternativeText ?? "Ornament"}
          width={1024}
          height={700}
          className="object-contain w-[1024px] lg:w-[700px] xl:w-[1024px]"
        />
      </motion.div>
    </section>
  );
};

export default TentangSection;
