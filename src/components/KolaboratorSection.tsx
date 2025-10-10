"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const logos = [
  "/assets/logo-1.png",
  "/assets/logo-2.png",
  "/assets/logo-3.png",
  "/assets/logo-4.png",
  "/assets/logo-5.png",
  "/assets/logo-6.png",
  "/assets/logo-7.png",
  "/assets/logo-8.png",
  "/assets/logo-9.png",
  "/assets/logo-10.png",
  "/assets/logo-11.png",
  "/assets/logo-12.png",
  "/assets/logo-13.png",
  "/assets/logo-14.png",
  "/assets/logo-15.png",
  "/assets/logo-16.png",
  "/assets/logo-17.png",
  "/assets/logo-18.png",
];

export default function KolaboratorSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative bg-[#FFFBE9] py-20 overflow-hidden">
      {/* Ornament kiri */}
      <motion.img
        src="/assets/ornament-kolaborator-kiri.png"
        alt="ornament left"
        className="absolute left-0 top-0 h-full object-cover z-0"
        initial={{ x: "-100%", opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />

      {/* Ornament kanan */}
      <motion.img
        src="/assets/ornament-kolaborator-kanan.png"
        alt="ornament right"
        className="absolute right-0 top-0 h-full object-cover z-0"
        initial={{ x: "100%", opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />

      {/* Konten */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-[64px] text-primary font-bruliafont mb-12">Kolaborator</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={logo} alt={`Logo ${index}`} width={100} height={80} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
