"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type HeroProps = {
  summary: string;
  title?: string;
  page?: string;
  images: string[];
};

export default function Hero({ title, summary, page, images }: HeroProps) {
  const { ref: logoRef, inView: logoInView } = useInView({ triggerOnce: true });

  // Tentukan properti berdasarkan halaman
  const isHome = page === "home";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const imageWidth = isHome ? 1080 : 816;
  const imageHeight = isHome ? 512 : 311;
  const animateConfig = isHome
    ? { y: -90, opacity: 1 }
    : { y: -140, opacity: 1 };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center z-0 overflow-hidden mt-[85px]">
      {/* Background */}
      <div className="absolute inset-0 flex flex-wrap">
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0 }}
          className="w-1/2 lg:w-1/4 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-1/2 lg:w-1/4 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[1]})` }}
        />
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-1/2 lg:w-1/4  bg-cover bg-center"
          style={{ backgroundImage: `url(${images[2]})` }}
        />
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="w-1/2 lg:w-1/4  bg-cover bg-center"
          style={{ backgroundImage: `url(${images[3]})` }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <motion.div
        ref={logoRef}
        initial={{ y: 100, opacity: 0 }}
        animate={logoInView ? animateConfig : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        className="relative z-10 text-center"
      >
        <Image
          src="/assets/logo-shadow.png"
          alt="Kolaboraya Logo"
          width={imageWidth}
          height={imageHeight}
          className="mx-auto drop-shadow-lg transition-all duration-700 ease-out"
          priority
        />
      </motion.div>

      {/* Frame putih (muncul setelah logo muncul) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={
          logoInView
            ? isHome
              ? isMobile
                ? { y: 50, opacity: 1 } // HOME + mobile
                : { y: 0, opacity: 1 } // HOME + desktop
              : { y: 0, opacity: 1 } // selain home
            : {}
        }
        transition={{ duration: 1, ease: "easeOut", delay: 2.4 }}
        className={`absolute  left-0 z-20 ${
          isHome ? "max-w-5xl mx-auto right-0 md:bottom-0" : "bottom-0 w-full"
        }`}
      >
        <div className="container mx-auto px-6">
          <div
            className={`bg-[#FFFBE9] ${
              isHome
                ? "rounded-b-[25px] md:rounded-b-none  rounded-t-[25px]  md:rounded-t-[60px]"
                : "rounded-t-[25px] md:rounded-t-[60px]"
            } px-5 md:px-14 lg:px-20 py-5 md:py-8 text-center`}
          >
            {isHome ? (
              <p className="font-bruliafont text-primary text-lg md:text-[40px]">
                {summary}
              </p>
            ) : (
              <>
                {title && (
                  <h2 className="text-[32px] md:text-[40px] xl:text-[64px] font-bruliafont text-primary mb-4">
                    {title}
                  </h2>
                )}
                <p className="text-gray-700 text-base md:text-lg xl:text-2xl leading-[18px] md:leading-[22px] xl:leading-[29px] mb-8">
                  {summary}
                </p>
                <Link
                  href="https://www.roemahinspirit.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#386366] text-white text-base md:text-lg xl:text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition"
                >
                  Tentang Roemah Inspirit
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
