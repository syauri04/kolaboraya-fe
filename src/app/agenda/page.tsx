"use client";

import ListAgenda from "@/components/ListAgenda";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Agenda() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmall(window.innerWidth < 640); // < sm
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div>
      <section
        ref={ref}
        className="relative bg-[#EDB133] h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start xl:items-center overflow-hidden mt-[85px]"
      >
        <div className="container mx-auto px-3 sm:px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
          <div className="max-w-[466px] text-primary">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: isSmall ? 35 : 60 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[48px] md:text-8xl font-bruliafont leading-[120%] mb-12 sm:mb-0 "
            >
              Agenda <br />
              Ekosistem
            </motion.h2>
          </div>
        </div>

        {/* Ornament Image */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[530px] xl:h-[800px] bottom-0 "
        >
          <Image
            src="/assets/bg-agenda-2.png" // ganti dengan path ornament image kamu
            alt="Ornament"
            fill
            className="object-cover sm:object-contain object-center sm:object-right"
          />
        </motion.div>
      </section>

      <ListAgenda />
    </div>
  );
}
