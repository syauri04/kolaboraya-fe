"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const customEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEasing },
  },
};

interface CollaborationSectionProps {
  title?: string;
  summary?: string;
  bgColor?: string;
  link?: string;
  image?: string | null;
  type?: "produk" | "senarai";
}

export default function CollaborationSection({
  title,
  summary,
  bgColor,
  link,
  image,
  type,
}: CollaborationSectionProps) {
  return (
    <section
      className="relative w-full min-h-[600px] overflow-visible "
      style={{ backgroundColor: bgColor || "#BB0D55" }}
    >
      <div className="container mx-auto grid lg:grid-cols-2">
        {/* LEFT COLUMN — text content */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 flex flex-col justify-center gap-12 px-6 py-16  sm:py-20  lg:py-24 "
        >
          <motion.h2
            variants={itemVariants}
            className="max-w-lg font-bruliafont text-4xl leading-[120%] text-[#FFFBE9] sm:text-5xl lg:text-[64px]"
          >
            {title || "Bagikan produk pengetahuanmu di Kolaboraya!"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg leading-[29px] text-[#FFFBE9] font-inclusive sm:text-xl lg:text-[24px]"
          >
            {summary ||
              "Kolaboraya adalah platform kolaborasi pengetahuan yang memungkinkanmu untuk berbagi, belajar, dan berkolaborasi dengan para kreator lainnya. Bergabunglah sekarang dan jadilah bagian dari komunitas kreatif kami!"}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className=" bg-[#386366] px-7 py-3 text-sm  text-[#FFFBE9] shadow-sm transition-colors hover:bg-[#2c4f52] sm:text-xl"
              style={
                type === "produk"
                  ? { backgroundColor: "#386366" }
                  : { backgroundColor: "#EA7841" }
              }
            >
              Submit
            </motion.button>

            <motion.a
              href={link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="  bg-[#FFFBE9] px-7 py-3 text-sm  text-[#386366] shadow-sm transition-colors hover:bg-gray-200 sm:text-xl"
            >
              Ketentuan
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — image */}
        <div className="relative min-h-[320px] w-full overflow-visible sm:min-h-[420px] lg:min-h-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: customEasing }}
            className="relative h-full min-h-[320px] w-full sm:min-h-[420px] lg:min-h-full"
          >
            <Image
              src={image || "/assets/g-budaya-1.jpg"}
              alt={title || "Kolaboraya - Platform Kolaborasi"}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {type === "senarai" && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: customEasing }}
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              className="pointer-events-none absolute top-0 right-0 hidden lg:block  h-[400px] w-[1000px]"
              style={{ transformOrigin: "50% 100%" }}
            >
              <Image
                src="/assets/ornament-top-cs.png"
                alt=""
                fill
                className="object-contain object-bottom"
              />
            </motion.div>
          )}

          {type === "senarai" && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEasing }}
              animate={{ y: [0, -6, 0] }}
              className="pointer-events-none absolute  -right-50 lg:right-0 bottom-0 sm:h-[300px] sm:w-[900px]  lg:h-[550px] lg:w-[1100px]"
            >
              <Image
                src="/assets/ornament-bottom-cs.png"
                alt=""
                fill
                className="object-contain object-bottom"
              />
            </motion.div>
          )}

          {type === "produk" && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: customEasing }}
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              className="pointer-events-none absolute -top-6 left-0  -translate-x-1/2 sm:-top-16  lg:-top-16 h-[150px] w-[150px]"
              style={{ transformOrigin: "50% 100%" }}
            >
              <Image
                src="/assets/ornament-flower.png"
                alt=""
                fill
                className="object-contain object-bottom"
              />
            </motion.div>
          )}

          {type === "produk" && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEasing }}
              animate={{ y: [0, -6, 0] }}
              className="pointer-events-none absolute  left-0   -translate-x-1/2 -bottom-24 sm:h-56 sm:w-56 lg:h-[250px] lg:w-[400px]"
            >
              <Image
                src="/assets/Senarai-ovale.png"
                alt=""
                fill
                className="object-contain object-bottom"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
