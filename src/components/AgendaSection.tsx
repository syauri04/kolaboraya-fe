"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

type AgendaItem = {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
};

const agendas: AgendaItem[] = [
  {
    id: 1,
    title: "Nongkrong KolaborAsa #33",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "23 Maret 2025",
    image: "/assets/agenda1.png",
  },
  {
    id: 2,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "23 Maret 2025",
    image: "/assets/agenda2.png",
  },
  {
    id: 3,
    title: "Nama Agenda #415",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "23 Maret 2025",
    image: "/assets/agenda3.png",
  },
];

export default function AgendaSection() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: bottomRef, inView: bottomInView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const updateWidth = () => {
        setWidth(slider.scrollWidth - slider.offsetWidth);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, [agendas.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#EDB133] min-h-[800px] py-18 overflow-hidden">
      {/* Ornament kiri atas (tetap di -left-24) */}
      <motion.div
        initial={{ x: -80, opacity: 0 }} // geser 80px ke kiri
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-28 -left-24"
      >
        <Image src="/assets/ornament-line-flower.png" alt="ornament" width={725} height={392} />
      </motion.div>

      {/* Ornament kanan tengah */}
      <motion.div
        initial={{ x: 80, opacity: 0 }} // geser 80px ke kanan
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        className="absolute top-1/3 -right-24"
      >
        <Image src="/assets/ornament-flower.png" alt="ornament" width={200} height={120} />
      </motion.div>

      {/* Ornament kiri bawah */}
      <motion.div
        ref={bottomRef}
        initial={{ y: 80, opacity: 0 }} // geser 80px ke bawah
        animate={bottomInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -bottom-10 -left-10"
      >
        <Image src="/assets/ornament-flower.png" alt="ornament" width={200} height={120} />
      </motion.div>

      {/* Ornament kanan bawah */}
      <motion.div
        initial={{ x: 80, opacity: 0 }} // geser 80px ke kanan
        animate={bottomInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-50 -right-24"
      >
        <Image src="/assets/ornament-line-bottom-flower.png" alt="ornament" width={725} height={120} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-18">
          {/* Kiri */}
          <motion.div initial={{ y: 80, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}>
            <h2 className="font-bruliafont text-8xl text-primary leading-[120%]">
              Agenda <br /> Ekosistem
            </h2>
          </motion.div>

          {/* Kanan */}
          <motion.div initial={{ y: 80, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }} className="max-w-[470px] mt-4 md:mt-0">
            <h2 className="font-bruliafont text-5xl leading-[67px] text-primary lg:text-right">Temukan agenda menarik di sekitarmu!</h2>
            <p className="text-primary mt-1 text-2xl leading-[29px] lg:text-right">Berkenalan dengan teman baru, temukan kolaborator, dan jadilah bagian dari ekosistem raya.</p>
          </motion.div>
        </div>

        {/* GRID DESKTOP (tetap sama) */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          className="-mx-[28px] hidden lg:grid grid-cols-3 divide-x-[3px] divide-black"
        >
          {agendas.map((agenda) => (
            <motion.div
              key={agenda.id}
              variants={{
                hidden: { y: 80, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col h-full px-7"
            >
              <h3 className="font-bruliafont text-4xl text-primary leading-[50px] mb-3">{agenda.title}</h3>
              <p className="text-primary text-lg leading-[22px] mb-2">{agenda.summary}</p>
              <p className="text-lg leading-[22px] text-[#5C5C5C] mb-8">{agenda.date}</p>

              <button className="flex items-center gap-6 text-primary font-bruliafont text-2xl mb-8 mt-auto ml-auto">
                Baca Lebih lanjut
                <span className="flex items-center">
                  <span className="block w-20 h-[3px] bg-[#191919]"></span>
                  <ArrowRight size={24} strokeWidth={2} className="-ml-2 text-primary" />
                </span>
              </button>

              <div className="w-full aspect-[389/219] relative">
                <Image src={agenda.image} alt={agenda.title} fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SLIDER MOBILE (revisi fix) */}
        <motion.div ref={sliderRef} className="lg:hidden cursor-grab active:cursor-grabbing overflow-hidden -mx-6">
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-8  pb-6">
            {agendas.map((agenda) => (
              <motion.div key={agenda.id} className="flex-shrink-0 w-[420px] flex flex-col ml-6  snap-start">
                <h3 className="font-bruliafont text-4xl text-primary leading-[50px] mb-3">{agenda.title}</h3>
                <p className="text-primary text-lg leading-[22px] mb-2">{agenda.summary}</p>
                <p className="text-lg leading-[22px] text-[#5C5C5C] mb-8">{agenda.date}</p>

                <button className="flex items-center gap-6 text-primary font-bruliafont text-2xl mb-8 mt-auto ml-auto">
                  Baca Lebih lanjut
                  <span className="flex items-center">
                    <span className="block w-20 h-[3px] bg-[#191919]"></span>
                    <ArrowRight size={24} strokeWidth={2} className="-ml-2 text-primary" />
                  </span>
                </button>

                <div className="w-full aspect-[389/219] relative">
                  <Image src={agenda.image} alt={agenda.title} fill className="object-cover " />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tombol Selengkapnya tetap */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }} className="flex justify-center mt-12">
          <button className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">Selengkapnya</button>
        </motion.div>
      </div>
    </section>
  );
}
