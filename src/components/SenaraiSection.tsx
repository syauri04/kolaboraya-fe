"use client";

import Image from "next/image";
import React from "react";

type SenaraiSectionProps = {
  text: string;
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function SenaraiSection({ text, showButton = false, buttonLabel = "Selengkapnya", buttonHref = "#" }: SenaraiSectionProps) {
  return (
    <section className="relative bg-[#F0ACCF] min-h-[1024px] pt-28 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col gap-0">
        {/* BLOK ATAS */}
        <div className="grid grid-cols-[40%_60%]">
          {/* Kolom kiri: oval */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[434px] h-[336px] ">
              <Image src="/assets/Senarai-ovale.png" alt="Senarai Oval" fill className="object-cover" />
            </div>
          </div>

          {/* Kolom kanan: board + text di atasnya */}
          <div className="flex justify-end">
            <div className="relative w-[800px] h-[488px] z-10">
              <Image src="/assets/Senarai-board.png" alt="Senarai Board" fill className="object-cover " />

              <div className="absolute top-0 -left-34 -space-y-24 ">
                <Image src="/assets/Senarai.png" alt="Senarai" width={367} height={159} className="pointer-events-none select-none" />
                <Image src="/assets/Cerita.png" alt="Cerita" width={367} height={159} className="pointer-events-none select-none ml-50" />
              </div>
            </div>
          </div>
        </div>

        {/* BLOK BAWAH */}
        <div className="grid grid-cols-[30%_70%]">
          {/* Kiri: teks */}
          <div className="pr-20">
            <p className="text-primary text-lg leading-[22px] mb-10 whitespace-pre-line">{text}</p>

            {showButton && (
              <a href={buttonHref}>
                <button className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">{buttonLabel}</button>
              </a>
            )}
          </div>

          {/* Kanan: Foto + oval */}
          <div className="flex justify-start relative">
            {/* Foto utama */}
            <div className="relative w-[800px] h-[488px] z-20 -top-24 ml-20">
              <Image src="/assets/Senarai-image.png" alt="Senarai Board" fill className="object-cover" />

              {/* Oval */}
              <div className="absolute -bottom-8 -right-36">
                <Image src="/assets/Senarai-ovale.png" alt="Senarai" width={434} height={336} className="pointer-events-none select-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
