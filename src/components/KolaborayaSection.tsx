"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function KolaborayaSection() {
  const controls = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const [isCircleDone, setIsCircleDone] = useState(false);

  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (inView) {
      // Lingkaran 1
      controls.start({
        clipPath: "circle(100% at 50% 50%)",
        transition: { duration: 1, ease: "easeInOut" },
      });

      // Lingkaran 2 — mulai overlap sedikit sebelum 1 selesai
      controls2.start({
        clipPath: "circle(100% at 50% 50%)",
        transition: { duration: 1.2, ease: "easeInOut", delay: 1.2 },
      });

      // Lingkaran 3 — mulai overlap lagi sedikit
      controls3.start({
        clipPath: "circle(100% at 50% 50%)",
        transition: { duration: 1.4, ease: "easeInOut", delay: 2.0 },
      });
    }
  }, [inView, controls, controls2, controls3]);

  return (
    <section ref={inViewRef} className="relative bg-[#6E87A8] w-full  overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col  items-center justify-center relative">
        <div className="relative w-full h-[650px] flex justify-center items-center overflow-hidden">
          {/* Lingkaran variant 1 */}
          <motion.img src="/assets/circle-variant1.png" alt="Lingkaran Kecil" initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={controls} className="absolute w-[700px] object-cover block" />

          {/* Lingkaran variant 2 */}
          <motion.img
            src="/assets/circle-variant2.png"
            alt="Lingkaran Sedang"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={controls2}
            onAnimationComplete={() => setIsCircleDone(true)}
            className="absolute w-full object-cover block"
          />

          {/* Lingkaran variant 3 */}
          <motion.img
            src="/assets/circle-variant3.png"
            alt="Lingkaran Besar"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={controls3}
            onAnimationComplete={() => setIsCircleDone(true)}
            className="absolute w-full object-cover block"
          />
        </div>
      </div>

      {/* Box putih di bawah */}
      <motion.div initial={{ y: 200, opacity: 0 }} animate={isCircleDone ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }} className="container mx-auto px-6 pt-8 relative z-10 ">
        <div className="bg-white rounded-t-[60px] px-6 py-12 text-center shadow-lg">
          <p className="text-gray-700 text-2xl leading-relaxed max-w-6xl mx-auto">Kolaboraya menghubungkan penggerak perubahan di level tapak, organisasi, dan individu dalam satu ekosistem yang vibrant, berdampak, dan saling mendukung.</p>
        </div>
      </motion.div>
    </section>
  );
}
