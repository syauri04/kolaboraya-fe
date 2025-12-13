"use client";

import { motion } from "framer-motion";

export default function SkeletonBanner() {
  return (
    <section className="relative h-auto lg:h-[668px] xl:h-[715px] flex flex-col lg:flex-row items-start xl:items-center overflow-hidden mt-[85px] animate-pulse bg-gray-200">
      <div className="container mx-auto px-3 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content Placeholder */}
        <div className="max-w-[466px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Title Skeleton */}
            <div className="h-[48px] md:h-[96px] w-[70%] bg-gray-300 rounded-md"></div>
            <div className="h-[48px] md:h-[96px] w-[60%] bg-gray-300 rounded-md"></div>
          </motion.div>
        </div>
      </div>

      {/* Image Placeholder */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative lg:absolute w-full h-[360px] md:h-[425px] lg:h-[530px] xl:h-[800px] bottom-0 bg-gray-300"
      />
    </section>
  );
}
