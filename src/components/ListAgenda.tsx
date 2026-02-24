"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AgendaItem } from "@/types/agenda";
import { Category } from "@/types/category";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatAgendaDate } from "@/utils/formatAgendaDate";

type ListAgendaProps = {
  agendas: AgendaItem[];
  categories: Category[];
};

type MappedAgendaItem = AgendaItem & { category: string; categorySlug: string };

export default function ListAgenda({ agendas, categories }: ListAgendaProps) {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const itemsPerPage = 9;

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  // Map agendas agar punya category & categorySlug
  const mappedAgendas: MappedAgendaItem[] = useMemo(() => {
    return agendas.map((a) => ({
      ...a,
      category: a.category_agenda?.Category?.trim() ?? "Uncategorized",
      categorySlug: a.category_agenda?.slug ?? "uncategorized",
    }));
  }, [agendas]);

  // Filter agendas berdasarkan kategori, bulan, dan tahun
  const filteredAgendas = useMemo(() => {
    let filtered = mappedAgendas;

    // Filter kategori
    if (activeCategory !== "semua") {
      filtered = filtered.filter(
        (a) => a.categorySlug.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    // Filter bulan
    if (selectedMonth) {
      const monthIndex = months.indexOf(selectedMonth); // 0-based
      filtered = filtered.filter((a) => {
        const date = new Date(a.dateStart);
        return date.getMonth() === monthIndex;
      });
    }

    // Filter tahun
    if (selectedYear) {
      const yearNum = parseInt(selectedYear);
      filtered = filtered.filter((a) => {
        const date = new Date(a.dateStart);
        return date.getFullYear() === yearNum;
      });
    }

    return filtered;
  }, [activeCategory, mappedAgendas, selectedMonth, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(filteredAgendas.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAgendas = filteredAgendas.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Array tombol kategori
  const categoryButtons = useMemo(() => {
    const cats = categories.map((c) => ({ label: c.Category, slug: c.slug }));
    return [{ label: "Semua", slug: "semua" }, ...cats];
  }, [categories]);

  return (
    <section className="container mx-auto py-14 md:py-20 px-3 sm:px-6 bg-[#FFFBE9]">
      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-4">
        {categoryButtons.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all ${
              activeCategory === cat.slug
                ? "bg-[#386366] text-white border-[#386366]"
                : "bg-transparent text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* MONTH & YEAR FILTER */}
      <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-8 md:mb-20">
        {/* Month Dropdown */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none px-4 pr-10 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all bg-transparent text-black border-gray-300 hover:bg-gray-100"
          >
            <option value="">Bulan</option>
            {months.map((month, idx) => (
              <option key={idx} value={month}>
                {month}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <ChevronDown size={20} />
          </span>
        </div>

        {/* Year Dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none px-4 pr-10 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all bg-transparent text-black border-gray-300 hover:bg-gray-100"
          >
            <option value="">Tahun</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <ChevronDown size={20} />
          </span>
        </div>
      </div>

      {/* GRID AGENDA */}
      <motion.div
        layout
        className="-mx-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {currentAgendas.map((agenda, index) => {
            const total = currentAgendas.length;
            const cols: number = 3;
            const isLastCol: boolean = (index + 1) % cols === 0;
            const isLastRow: boolean =
              index >= total - (total % cols === 0 ? cols : total % cols);

            const borderRight: string =
              cols === 1 ? "" : !isLastCol ? "border-r-[3px] border-black" : "";
            const borderBottom: string =
              cols === 1 ? "" : !isLastRow ? "border-b-[3px] border-black" : "";

            const { dayLabel, dateLabel } = formatAgendaDate(
              agenda.dateStart,
              agenda.dateEnd,
            );

            const generateGoogleCalendarLink = (agenda: AgendaItem) => {
              if (!agenda?.dateStart) return "#";

              const title = encodeURIComponent(agenda.title);
              const details = encodeURIComponent(agenda.summary || "");
              const location = encodeURIComponent(agenda.location || "");

              const startDateObj = new Date(agenda.dateStart);
              const endDateObj = agenda.dateEnd
                ? new Date(agenda.dateEnd)
                : startDateObj;

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
              <motion.div
                key={agenda.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col h-full p-7 bg-transparent ${borderRight} ${borderBottom}`}
              >
                <div className="w-full aspect-[4/5] relative">
                  <Image
                    src={
                      agenda.image?.url
                        ? `${agenda.image.url}`
                        : "/assets/placeholder.png"
                    }
                    alt={agenda.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bruliafont text-xl text-primary leading-[30px] mt-8 mb-3 ">
                  {agenda.title}
                </h3>
                <p className="text-primary text-lg leading-[22px] mb-2">
                  {agenda.summary}
                </p>
                <div className="flex flex-col gap-4 mt-2 mb-4 text-[#5C5C5C]">
                  <div className="flex items-start gap-3 text-lg leading-[22px]">
                    <FiCalendar size={20} className="text-primary mt-1" />
                    <div className="flex flex-col">
                      <span className="capitalize">{dayLabel}</span>
                      <span>{dateLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-lg leading-[22px]">
                    <FiMapPin size={20} className="text-primary mt-1" />
                    <span className="w-[95%]">{agenda.location}</span>
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page
                    ? "bg-[#386366] text-white border-[#386366]"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
