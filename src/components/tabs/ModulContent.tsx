"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProduks } from "@/services/produk";
import { ProdukItem } from "@/types/produk";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ModulContent() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ➤ STATE UNTUK POPUP
  const [selectedProduk, setSelectedProduk] = useState<ProdukItem | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProduks();
        setProduks(data);
      } catch (err) {
        console.error("Failed to fetch produk:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (produks.length === 0)
    return <p className="text-center py-10">Tidak ada produk.</p>;

  return (
    <div>
      {/* GRID LIST */}
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {produks.map((item) => {
            const imageUrl =
              item.image?.formats?.thumbnail?.url ?? item.image?.url ?? "";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full bg-transparent cursor-pointer"
                onClick={() => setSelectedProduk(item)} // ✔ SET PRODUK UNTUK POPUP
              >
                {/* IMAGE */}
                <div className="w-full aspect-square relative mb-4">
                  <Image
                    src={imageUrl.startsWith("http") ? imageUrl : `${imageUrl}`}
                    alt={item.title}
                    fill
                    className="object-cover rounded-[18px]"
                  />
                </div>

                {/* TITLE */}
                <h3 className="font-bruliafont text-xl sm:text-2xl text-primary">
                  {item.title}
                </h3>

                {/* SUMMARY */}
                <p className="text-base sm:text-lg text-[#5C5C5C]">
                  {item.lembaga}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

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
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[27px] shadow-[0px_4px_49.6px_rgba(0,0,0,0.08)] p-10 md:p-16 relative grid grid-cols-1 md:grid-cols-2 gap-8"
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

              {/* LEFT — IMAGE */}
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-[18px] overflow-hidden bg-white">
                  <Image
                    src={
                      selectedProduk.image?.url.startsWith("http")
                        ? selectedProduk.image.url
                        : `${selectedProduk.image.url}`
                    }
                    alt={selectedProduk.title}
                    fill
                    className="object-contain rounded-[18px]"
                  />
                </div>
              </div>

              {/* RIGHT — INFO */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bruliafont text-primary">
                    {selectedProduk.title}
                  </h2>

                  <p className="text-2xl text-[#5C5C5C] mt-1">
                    {selectedProduk.lembaga}
                  </p>

                  <p className="text-primary text-2xl mt-4 leading-[29px]">
                    {selectedProduk.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <p className="p-3 text-2xl leading-[29px] text-[#386366] border border-[#386366] w-fit">
                    MODUL
                  </p>

                  {selectedProduk.Link ? (
                    <Link
                      href={selectedProduk.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 p-5 bg-[#386366] text-white text-2xl w-fit cursor-pointer"
                    >
                      Selengkapnya
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-4 p-5 bg-gray-300 text-white text-2xl w-fit cursor-not-allowed"
                    >
                      Selengkapnya
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
