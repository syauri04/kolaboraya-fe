"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function KolaborayaSection() {
  const controls = useAnimation();
  const controls2 = useAnimation();
  const [isCircleDone, setIsCircleDone] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (inView) {
      controls.start({ clipPath: "circle(100% at 50% 50%)" });
      controls2.start({
        clipPath: "circle(100% at 50% 50%)",
        transition: { delay: 1 },
      });
    }
  }, [inView, controls, controls2]);

  return (
    <section ref={inViewRef} className="relative bg-[#6E87A8] w-full min-h-[1024px] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col min-h-[1000px] items-center justify-center relative">
        <div className="relative w-full h-[800px] flex justify-center items-center overflow-hidden">
          {/* Lingkaran kecil */}
          <motion.img
            src="/assets/lingkaran-kecil.png"
            alt="Lingkaran Kecil"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute w-[700px] object-cover block"
          />

          {/* Lingkaran besar */}
          <motion.img
            src="/assets/lingkaran-besar.svg"
            alt="Lingkaran Besar"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={controls2}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={() => setIsCircleDone(true)} // trigger selesai animasi
            className="absolute w-full object-cover block"
          />
        </div>
      </div>

      {/* Box putih di bawah */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={isCircleDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // delay tambahan
        className="container mx-auto px-6 -mt-32 relative z-10 pt-30"
      >
        <div className="bg-white rounded-t-[60px] px-6 py-12 text-center shadow-lg">
          <p className="text-gray-700 text-lg leading-relaxed max-w-6xl mx-auto">Kolaboraya menghubungkan penggerak perubahan di level tapak, organisasi, dan individu dalam satu ekosistem yang vibrant, berdampak, dan saling mendukung</p>
        </div>
      </motion.div>
    </section>
  );
}
