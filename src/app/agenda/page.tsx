"use client";

import ListAgenda from "@/components/ListAgenda";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function Agenda() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div>
      <section ref={ref} className="relative bg-[#EDB133] h-[1024px] flex items-center overflow-hidden mt-[85px]">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
          <div className="max-w-[466px] text-primary">
            <motion.h2 initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className="text-8xl font-bruliafont leading-[120%] ">
              Agenda <br />
              Ekosistem
            </motion.h2>
          </div>

          {/* Spacer untuk mobile agar gambar turun */}
          <div className="block md:hidden h-12" />
        </div>

        {/* Ornament Image */}
        <motion.div initial={{ opacity: 0, x: 200 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="absolute w-full h-[1024px] ">
          <Image
            src="/assets/bg-agenda.png" // ganti dengan path ornament image kamu
            alt="Ornament"
            fill
            className="object-contain object-right"
          />
        </motion.div>
      </section>

      <ListAgenda />
    </div>
  );
}
