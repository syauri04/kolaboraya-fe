"use client";

import { useEffect, useState } from "react";

export function useResponsiveRadius() {
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setRadius(media.matches ? 150 : 220);
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return radius;
}
