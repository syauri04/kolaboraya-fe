"use client";

import Image from "next/image";

export default function ProdukKolaborasi() {
  const products = [
    {
      id: 1,
      title: "MODUL",
      image: "/assets/produk-modul.png",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: false,
    },
    {
      id: 2,
      title: "ALAT BANTU",
      image: "/assets/produk-alat.png",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur.",
      button: true,
    },
  ];

  return (
    <section className="relative bg-[#C8DDC1] py-24 min-h-[1024px]  overflow-hidden">
      {/* Ornament kanan atas */}
      <Image src="/assets/ornament-flower.png" alt="ornament" width={400} height={400} className="absolute -top-26 -right-36 z-0" />
      {/* Ornament kiri bawah */}
      <Image src="/assets/ornament-produk.png" alt="ornament" width={740} height={600} className="absolute -bottom-46 left-30 z-0" />

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 px-6  z-10">
        {/* Title kiri */}
        <div className="text-center md:text-left">
          <h2 className="text-6xl md:text-8xl font-bruliafont text-primary leading-[134px]">
            Produk <br className="hidden md:block" /> Kolaborasi
          </h2>
        </div>

        {/* List produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {products.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* Image */}
              <div className="relative rounded-t-[50px] w-full aspect-square overflow-hidden">
                <Image src={item.image} alt={item.title} fill className=" object-cover" />
              </div>

              {/* Title dengan bg image */}
              <div className="relative -mt-6 z-10">
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/assets/ornament-card-produk.png" // ganti dengan path bg title yang kamu punya
                    alt="title background"
                    width={500}
                    height={80}
                    className="w-full h-[60px] md:h-[80px] object-cover"
                  />
                  <h3 className="absolute text-white font-bruliafont text-4xl md:text-[40px] uppercase tracking-wide">{item.title}</h3>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-transparent mt-4">
                <p className="text-primary text-lg leading-[22px] mb-4">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex justify-end mt-20">
          <button className="bg-[#386366] text-white text-2xl font-bruliafont px-4 py-2 rounded-lg hover:bg-[#7b91c8] transition">Selengkapnya</button>
        </div>
      </div>
    </section>
  );
}
