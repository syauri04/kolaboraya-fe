"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ProdukItem = {
  id: number;
  title: string;
  summary: string;
  image: string;
  category: string;
};

const categories = ["Semua", "Ebook", "Alat Bantu", "Audio Visual"];

// dummy data (ganti dengan props fetch API)
const produks: ProdukItem[] = [
  {
    id: 1,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk1.png",
    category: "Ebook",
  },
  {
    id: 2,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk2.png",
    category: "Alat Bantu",
  },
  {
    id: 3,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk3.png",
    category: "Audio Visual",
  },
  {
    id: 4,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk4.png",
    category: "Ebook",
  },
  {
    id: 5,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk4.png",
    category: "Alat Bantu",
  },
  {
    id: 6,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk3.png",
    category: "Audio Visual",
  },
  {
    id: 7,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk2.png",
    category: "Alat Bantu",
  },
  {
    id: 8,
    title: "Nama Produk/Barang",
    summary: "Nama Lembaga/Komunitas",
    image: "/assets/produk1.png",
    category: "Audio Visual",
  },
];

export default function ListProduk() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // filter agendas
  const filteredProduk = useMemo(() => {
    if (activeCategory === "Semua") return produks;
    return produks.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // pagination logic
  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProduks = filteredProduk.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="container mx-auto py-14 md:py-20 px-6 bg-[#FFFBE9]">
      {/* Filter Categories */}
      <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-8 md:mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1); // reset page ketika ganti kategori
            }}
            className={`px-4 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all ${
              activeCategory === cat
                ? "bg-[#386366] text-white border-[#386366]"
                : "bg-transparent text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Agendas */}
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {currentProduks.map((produk, index) => {
            return (
              <motion.div
                key={produk.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full bg-transparent"
              >
                {/* Image */}
                <div className="w-full aspect-square relative mb-4">
                  <Image
                    src={produk.image}
                    alt={produk.title}
                    fill
                    className="object-cover rounded-[18px]"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bruliafont text-xl sm:text-2xl leading-[120%] sm:leading-[34px] text-primary mb-2">
                  {produk.title}
                </h3>

                {/* Summary */}
                <p className="text-base sm:text-lg leading-[120%] sm:leading-[22px] text-[#5C5C5C]">
                  {produk.summary}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
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
