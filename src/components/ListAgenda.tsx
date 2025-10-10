"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AgendaItem = {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
};

const categories = ["Semua", "Nongkrong Kolaborasa", "Jelajah Kolaboraya", "Workshop", "Diskusi Panel", "Pameran / Showcase", "Volunteering"];

// dummy data (ganti dengan props fetch API)
const agendas: AgendaItem[] = [
  {
    id: 1,
    title: "Nongkrong KolaborAsa #33",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda1.png",
    category: "Nongkrong Kolaborasa",
  },
  {
    id: 2,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda2.png",
    category: "Jelajah Kolaboraya",
  },
  {
    id: 3,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda3.png",
    category: "Workshop",
  },
  {
    id: 4,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda1.png",
    category: "Diskusi Panel",
  },
  {
    id: 5,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda2.png",
    category: "Volunteering",
  },
  {
    id: 6,
    title: "Jelajah Kolaboraya #Palu",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
    date: "26 Maret 2025",
    image: "/assets/agenda3.png",
    category: "Pameran / Showcase",
  },
];

export default function ListAgenda() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // filter agendas
  const filteredAgendas = useMemo(() => {
    if (activeCategory === "Semua") return agendas;
    return agendas.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // pagination logic
  const totalPages = Math.ceil(filteredAgendas.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAgendas = filteredAgendas.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="container mx-auto py-20 px-6 bg-[#FFFBE9]">
      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1); // reset page ketika ganti kategori
            }}
            className={`px-4 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all ${activeCategory === cat ? "bg-[#386366] text-white border-[#386366]" : "bg-transparent text-black border-gray-300 hover:bg-gray-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Agendas */}
      <motion.div layout className="-mx-[24px] grid grid-cols-1 md:grid-cols-3">
        <AnimatePresence>
          {currentAgendas.map((agenda, index) => {
            const total = currentAgendas.length;
            const isLastCol = (index + 1) % 3 === 0; // kolom terakhir
            const isLastRow = index >= total - (total % 3 === 0 ? 3 : total % 3); // baris terakhir

            return (
              <motion.div
                key={agenda.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className={`
            flex flex-col h-full p-7 bg-transparent
            ${!isLastCol ? "border-r-[3px] border-black" : ""}
            ${!isLastRow ? "border-b-[3px] border-black" : ""}
          `}
              >
                <h3 className="font-bruliafont text-4xl text-primary leading-[50px] mb-3 min-h-[100px]">{agenda.title}</h3>
                <p className="text-primary text-lg leading-[22px] mb-2">{agenda.summary}</p>
                <p className="text-lg leading-[22px] text-[#5C5C5C] mb-8">{agenda.date}</p>

                <button className="flex items-center gap-6 text-primary font-bruliafont text-2xl mb-8 mt-auto ml-auto">
                  Selengkapnya
                  <span className="flex items-center">
                    <span className="block w-20 h-[3px] bg-[#191919]"></span>
                    <ArrowRight size={24} strokeWidth={2} className="-ml-2 text-primary" />
                  </span>
                </button>

                <div className="w-full aspect-[389/219] relative">
                  <Image src={agenda.image} alt={agenda.title} fill className="object-cover" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-[#386366] text-white border-[#386366]" : "bg-white"}`}>
                {page}
              </button>
            );
          })}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </section>
  );
}
