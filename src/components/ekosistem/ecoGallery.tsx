"use client";

import Image from "next/image";
import { useRef } from "react";

type EcoGalleryProps = {
  data: {
    images: string[];
  };
};

export default function EcoGallery({ data }: EcoGalleryProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 py-20">
        <div className="relative -mx-3 sm:-mx-6">
          <div
            ref={sliderRef}
            className="flex gap-6 md:gap-12 px-3 sm:px-6 cursor-grab active:cursor-grabbing select-none overflow-hidden"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
          >
            {data.images.map((src, index) => (
              <div key={index} className="shrink-0 w-[350px] md:w-[568.88px]">
                <div className="relative w-full overflow-hidden rounded-[20px] md:rounded-[30px] aspect-[350/185] md:aspect-[568.88/300.13]">
                  <Image
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 350px, 568.88px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
