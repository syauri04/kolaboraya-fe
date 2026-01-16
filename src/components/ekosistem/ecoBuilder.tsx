"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type EcoBuilderItem = {
  label: string;
  link: string;
};

type EcoBuilderProps = {
  data: {
    items: EcoBuilderItem[];
  };
  colorBadge?: string;
  colorText?: string;
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

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function EcoBuilder({
  data,
  colorBadge,
  colorText,
}: EcoBuilderProps) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full">
      <div className="container mx-auto px-3 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-stretch">
          {/* LEFT - Title centered */}
          <div className="flex items-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="text-[40px] leading-[48px] font-semibold text-white"
            >
              ECOSYSTEM BUILDER
            </motion.h2>
          </div>

          {/* Builder Links */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.25 }}
            className="flex flex-wrap gap-4 w-[60%]"
          >
            {data.items.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="flex items-center gap-2 rounded-[8px] px-5 py-3 w-fit font-bruliafont text-2xl leading-[32px] transition hover:opacity-90"
                style={{
                  backgroundColor: colorBadge || "#FFD8D5",
                  color: colorText || "#FFFBE9",
                }}
              >
                <span>{item.label}</span>
                <FiArrowUpRight className="text-3xl" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
