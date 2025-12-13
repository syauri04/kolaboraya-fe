"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ModulContent from "./ModulContent";
import AudioVisualContent from "./AudioVisualContent";

export default function TabSection() {
  const [activeTab, setActiveTab] = useState<"modul" | "audio">("modul");

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* --- TAB BUTTONS --- */}
        <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-8 md:mb-18">
          <button
            onClick={() => setActiveTab("modul")}
            className={`px-4 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all
              ${
                activeTab === "modul"
                  ? "bg-[#386366] text-white border-[#386366]"
                  : "bg-transparent text-black border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            Modul
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`px-4 py-2 border rounded-md text-sm md:text-base cursor-pointer transition-all
              ${
                activeTab === "audio"
                  ? "bg-[#386366] text-white border-[#386366]"
                  : "bg-transparent text-black border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            Audio Visual
          </button>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="relative min-h-[200px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "modul" && <ModulContent />}
            {activeTab === "audio" && <AudioVisualContent />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
