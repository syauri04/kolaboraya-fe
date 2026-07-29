"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface HeroSlide {
  id: string | number;
  image: string | null;
  title: string;
  summary: string;
  buttonText: string;
  buttonHref: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const textBase =
    "opacity-0 translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0";

  return (
    <section className="mt-[85px]">
      <div className="relative mx-auto ">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          fadeEffect={{ crossFade: true }}
          speed={1100}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          navigation={{
            prevEl: ".hero-slider-prev",
            nextEl: ".hero-slider-next",
          }}
          pagination={{ clickable: true, el: ".hero-slider-pagination" }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          className="hero-slider overflow-hidden "
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[460px] w-full sm:h-[620px] lg:h-[720px]">
                {/* Background image with slow ken-burns zoom while active */}
                <Image
                  src="/assets/toBanner.png"
                  // src={slide.image ?? ""}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Legibility overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" /> */}

                {/* Centered content */}
                <div
                  className={`relative z-10 flex h-full flex-col items-center ${slide.title ? `justify-center` : `justify-end pb-32`}  px-6 text-center sm:px-12 lg:px-20`}
                >
                  <h2
                    className={`max-w-3xl text-4xl font-bruliafont font-bold leading-tight text-white sm:text-5xl lg:text-7xl ${textBase}`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`mt-4 max-w-2xl font-inclusive text-base text-white/90 sm:lg lg:mt-5 lg:text-xl ${textBase}`}
                    style={{ transitionDelay: "380ms" }}
                  >
                    {slide.summary}
                  </p>
                  <Link
                    href={slide.buttonHref}
                    className={`mt-6 inline-flex items-center font-bruliafont justify-center rounded-full bg-[#386366] px-7 py-3 text-sm  text-white shadow-lg  transition-colors duration-300 hover:bg-[#7b91c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2  sm:mt-7 sm:text-base lg:mt-8 ${textBase}`}
                    style={{ transitionDelay: "550ms" }}
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav arrows */}
        <button
          type="button"
          aria-label="Slide sebelumnya"
          className="hero-slider-prev absolute -left-3 sm:left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-md transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 sm:p-3 lg:left-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Slide berikutnya"
          className="hero-slider-next absolute -right-3 sm:right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-md transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:p-3 lg:right-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Custom pagination */}
        <div className="hero-slider-pagination absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-7" />
      </div>

      <style jsx global>{`
        .hero-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 !important;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 9999px;
          transition:
            width 0.35s ease,
            background-color 0.35s ease;
          cursor: pointer;
        }
        .hero-slider .swiper-pagination-bullet-active {
          width: 26px;
          background: #db2777;
        }
      `}</style>
    </section>
  );
}
