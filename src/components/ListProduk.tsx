"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProdukItem } from "@/types/produk";
import { Category } from "@/types/category";

type ListProdukProps = {
  produks: ProdukItem[];
  categories: Category[];
};

type MappedProduk = {
  id: number;
  title: string;
  lembaga: string;
  description: string;
  image: string;
  category: string;
};

export default function ListProduk({ produks, categories }: ListProdukProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // popup state
  const [selectedProduk, setSelectedProduk] = useState<MappedProduk | null>(
    null
  );

  const itemsPerPage = 12;

  const categoryNames = ["Semua", ...categories.map((c) => c.Category)];

  const mappedProduks = useMemo(() => {
    return produks.map((p) => ({
      id: p.id,
      title: p.title,
      lembaga: p.lembaga,
      description: p.description,
      image: p.image?.url
        ? process.env.NEXT_PUBLIC_API_BASE_URL + p.image.url
        : "/placeholder.png",
      category: p.category_produk?.Category ?? "Uncategorized",
    }));
  }, [produks]);

  const filteredProduk = useMemo(() => {
    if (activeCategory === "Semua") return mappedProduks;
    return mappedProduks.filter((p) => p.category === activeCategory);
  }, [activeCategory, mappedProduks]);

  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProduks = filteredProduk.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="container mx-auto py-14 md:py-20 px-3 sm:px-6 bg-[#FFFBE9]">
      {/* FILTER */}
      <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-8 md:mb-20">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
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

      {/* GRID PRODUK */}
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {currentProduks.map((produk) => (
            <motion.div
              key={produk.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full bg-transparent cursor-pointer"
              onClick={() => setSelectedProduk(produk)}
            >
              {/* IMAGE */}
              <div className="w-full aspect-square relative mb-4">
                <Image
                  src={produk.image}
                  alt={produk.title}
                  fill
                  className="object-cover rounded-[18px]"
                />
              </div>

              {/* TITLE */}
              <h3 className="font-bruliafont text-xl sm:text-2xl text-primary mb-2">
                {produk.title}
              </h3>

              {/* SUMMARY */}
              <p className="text-base sm:text-lg text-[#5C5C5C]">
                {produk.lembaga}
              </p>
            </motion.div>
          ))}
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

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedProduk && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[27px] shadow-[0px 4px 49.6px rgba(0, 0, 0, 0.08)] p-10 md:p-16 relative grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* BUTTON CLOSE */}
              <button
                className="absolute top-4 right-4 text-xl cursor-pointer"
                onClick={() => setSelectedProduk(null)}
              >
                ✕
              </button>

              {/* LEFT COLUMN — IMAGE */}
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-[18px] overflow-hidden bg-white ">
                  <Image
                    src={selectedProduk.image}
                    alt={selectedProduk.title}
                    fill
                    className="object-contain rounded-[18px]"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN — INFO */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bruliafont text-primary">
                    {selectedProduk.title}
                  </h2>
                  <p className="text-2xl font-bruliafont text-[#5C5C5C] mt-1">
                    {selectedProduk.lembaga}
                  </p>

                  <p className="text-primary text-2xl mt-4 leading-[29px]">
                    {selectedProduk.description}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-6 flex flex-col gap-3">
                  <p className="p-3 text-2xl leading-[29px] text-[#386366] border border-[#386366] w-fit">
                    {selectedProduk.category}
                  </p>

                  <button className="mt-4 p-5 bg-[#386366] text-white text-2xl w-fit ">
                    Selengkapnya
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
