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

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 py-20">
        <div className="relative -mx-3 sm:-mx-6">
          <div
            ref={sliderRef}
            className="flex gap-12 px-3 sm:px-6 cursor-grab active:cursor-grabbing select-none overflow-hidden"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {data.images.map((src, index) => (
              <div
                key={index}
                className="shrink-0"
                style={{ width: "568.88px" }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[30px]"
                  style={{ aspectRatio: "568.88 / 300.13" }}
                >
                  <Image
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none"
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
