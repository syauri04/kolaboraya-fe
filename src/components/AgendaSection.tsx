"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { formatAgendaDate } from "@/utils/formatAgendaDate";
import { FiCalendar, FiMapPin } from "react-icons/fi";
// import { AgendaItem } from "@/types/agenda"; // <-- tidak dipakai, bisa dihapus
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export type onTextData = {
  taglineAgenda: string;
  summaryAgenda: string;
};

type AgendaSectionProps = {
  onText: onTextData;
  agendas: {
    id: number;
    title: string;
    summary: string;
    dateStart: string;
    dateEnd: string;
    location: string;
    linkRegister: string;
    image: string;
  }[];
};

export default function AgendaSection({ onText, agendas }: AgendaSectionProps) {
  const { taglineAgenda, summaryAgenda } = onText;

  // local alias type for a single agenda item used in this component
  type LocalAgenda = AgendaSectionProps["agendas"][number];

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: bottomRef, inView: bottomInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
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

  const generateGoogleCalendarLink = (agenda: LocalAgenda) => {
    if (!agenda?.dateStart) return "#";

    const title = encodeURIComponent(agenda.title);
    const details = encodeURIComponent(agenda.summary || "");
    const location = encodeURIComponent(agenda.location || "");

    const startDateObj = new Date(agenda.dateStart);
    const endDateObj = agenda.dateEnd ? new Date(agenda.dateEnd) : startDateObj;

    // Google Calendar expects YYYYMMDDTHHMMSSZ (we'll keep the Z)
    const start = startDateObj
      .toISOString()
      .replace(/[-:.]/g, "")
      .replace(/Z$/, "Z");
    const end = endDateObj
      .toISOString()
      .replace(/[-:.]/g, "")
      .replace(/Z$/, "Z");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#EDB133] min-h-[800px] py-18 overflow-hidden"
    >
      {/* Ornament kiri atas (tetap di -left-24) */}
      <motion.div
        initial={{ x: -80, opacity: 0 }} // geser 80px ke kiri
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-28 -left-24"
      >
        <Image
          src="/assets/ornament-line-flower.png"
          alt="ornament"
          width={725}
          height={392}
        />
      </motion.div>

      {/* Ornament kanan tengah */}
      <motion.div
        initial={{ x: 80, opacity: 0 }} // geser 80px ke kanan
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        className="absolute top-1/3 -right-24"
      >
        <Image
          src="/assets/ornament-flower.png"
          alt="ornament"
          width={200}
          height={120}
        />
      </motion.div>

      {/* Ornament kiri bawah */}
      <motion.div
        ref={bottomRef}
        initial={{ y: 80, opacity: 0 }} // geser 80px ke bawah
        animate={bottomInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -bottom-10 -left-10"
      >
        <Image
          src="/assets/ornament-flower.png"
          alt="ornament"
          width={200}
          height={120}
        />
      </motion.div>

      {/* Ornament kanan bawah */}
      <motion.div
        initial={{ x: 80, opacity: 0 }} // geser 80px ke kanan
        animate={bottomInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-50 -right-24"
      >
        <Image
          src="/assets/ornament-line-bottom-flower.png"
          alt="ornament"
          width={725}
          height={120}
        />
      </motion.div>

      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-9 sm:mb-18">
          {/* Kiri */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="font-bruliafont text-5xl sm:text-8xl text-primary leading-[120%]">
              Agenda <br /> Ekosistem
            </h2>
          </motion.div>

          {/* Kanan */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="max-w-[470px] mt-4 md:mt-0"
          >
            <h2 className="font-bruliafont text-3xl sm:text-5xl leading-[120%] sm:leading-[67px] text-primary lg:text-right">
              {taglineAgenda}
            </h2>
            <p className="text-primary mt-1 text-lg sm:text-2xl leading-[120%] sm:leading-[29px] lg:text-right">
              {summaryAgenda}
            </p>
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
          {agendas.map((agenda) => {
            const { dayLabel, dateLabel } = formatAgendaDate(
              agenda.dateStart,
              agenda.dateEnd
            );

            return (
              <motion.div
                key={agenda.id}
                variants={{
                  hidden: { y: 80, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex flex-col h-full px-7"
              >
                <h3 className="font-bruliafont text-4xl text-primary leading-[50px] mb-3">
                  {agenda.title}
                </h3>
                <p className="text-primary text-lg leading-[22px] mb-2">
                  {agenda.summary}
                </p>
                <div className="flex flex-col gap-4 mt-2 mb-4 text-primary">
                  <div className="flex items-start gap-3 text-lg leading-[22px]">
                    <FiCalendar size={20} className="text-primary mt-1" />
                    <div className="flex flex-col">
                      <span className="capitalize">{dayLabel}</span>
                      <span>{dateLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-lg leading-[22px]">
                    <FiMapPin size={20} className="text-primary mt-1" />
                    <span>{agenda.location}</span>
                  </div>
                </div>

                <div
                  className={`flex items-center mb-8 mt-auto w-full ${
                    agenda.linkRegister ? "justify-between" : "justify-end"
                  }`}
                >
                  {agenda.linkRegister && (
                    <a
                      href={agenda.linkRegister}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#386366] text-white text-xl px-6 py-3 rounded-lg text-center"
                    >
                      Register
                    </a>
                  )}

                  <button
                    onClick={() => {
                      const url = generateGoogleCalendarLink(agenda);
                      if (url !== "#") {
                        window.open(url, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="flex items-center gap-0 text-primary font-bruliafont text-2xl cursor-pointer"
                  >
                    Add to Calendar
                    <span className="flex items-center">
                      <ChevronRight
                        size={24}
                        strokeWidth={2}
                        className="text-primary"
                      />
                    </span>
                  </button>
                </div>

                <div className="w-full aspect-[389/219] relative">
                  <Image
                    src={agenda.image}
                    alt={agenda.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* SLIDER MOBILE */}
        <motion.div
          ref={sliderRef}
          className="lg:hidden cursor-grab active:cursor-grabbing overflow-hidden -mx-6"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-4 xs:gap-8  pb-6"
          >
            {agendas.map((agenda) => (
              <motion.div
                key={agenda.id}
                className="flex-shrink-0 w-[260px] xs:w-[290px] sm:w-[420px] flex flex-col ml-6  snap-start"
              >
                <h3 className="font-bruliafont text-3xl sm:text-4xl text-primary leading-[120%] sm:leading-[50px] mb-3">
                  {agenda.title}
                </h3>
                <p className="text-primary text-base sm:text-lg leading-[120%] sm:leading-[22px] mb-2">
                  {agenda.summary}
                </p>
                <p className="text-base sm:text-lg leading-[120%] sm:leading-[22px] text-[#5C5C5C] mb-8">
                  {agenda.dateStart}
                </p>

                <button className="flex items-center gap-6 text-primary font-bruliafont text-base sm:text-2xl mb-8 mt-auto ml-auto">
                  Baca Lebih lanjut
                  <span className="flex items-center">
                    <span className="block w-20 h-[3px] bg-[#191919]"></span>
                    <ArrowRight
                      size={24}
                      strokeWidth={2}
                      className="-ml-2 text-primary"
                    />
                  </span>
                </button>

                <div className="w-full aspect-[389/219] relative">
                  <Image
                    src={agenda.image}
                    alt={agenda.title}
                    fill
                    className="object-cover "
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tombol Selengkapnya tetap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/agenda"
            className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition"
          >
            Selengkapnya
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
