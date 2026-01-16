// src/config/ekosistemTheme.ts

export type EkosistemTheme = {
  bgColorPrimary: string;
  ColorBgHeader: string;
  BadgeBuilderBg: string;
  sectionBg: string;
  textColorPrimary: string;
  textColorBuilder: string;
  textColorSecondary: string;
  ornaments: {
    src: string;
    className: string; // ⬅️ Tailwind langsung
  }[];

  badgeAksiBg: string;
  badgeDukunganBg: string;
  bgColorDukungan: string;
};

export const ekosistemThemeMap: Record<string, EkosistemTheme> = {
  ekonomi: {
    bgColorPrimary: "#F97369",
    ColorBgHeader: "#CA3F34",
    BadgeBuilderBg: "#FFD8D5",
    sectionBg: "#CA3F34",
    textColorPrimary: "#FFFBE9",
    textColorBuilder: "#191919",
    textColorSecondary: "#191919",
    ornaments: [
      {
        src: "/assets/ornament-ekonomi-kiri-atas.png",
        className: "top-0 left-0 w-[350px] h-[450px]",
      },
      {
        src: "/assets/ornament-ekonomi-kanan-atas.png",
        className: "top-0 right-0 w-[450px] h-[450px]",
      },
      {
        src: "/assets/ornament-ekonomi-kiri-bawah.png",
        className: "bottom-0 left-0 w-[450px] h-[550px]",
      },
      {
        src: "/assets/ornament-ekonomi-kanan-bawah.png",
        className: "bottom-0 right-0 w-[350px] h-[450px]",
      },
    ],

    badgeAksiBg: "#FFD8D5",
    badgeDukunganBg: "#F97369",
    bgColorDukungan: "#FFD8D5",
  },

  teknologi: {
    bgColorPrimary: "#475D7D",
    ColorBgHeader: "#6C82A1",
    BadgeBuilderBg: "#E6EFFD",
    sectionBg: "#6C82A1",
    textColorPrimary: "#FFFBE9",
    textColorBuilder: "#191919",
    textColorSecondary: "#191919",
    ornaments: [
      {
        src: "/assets/ornament-teknologi-1.png",
        className: "top-0 left-0 w-[450px] h-[450px]",
      },
      {
        src: "/assets/ornament-teknologi-2.png",
        className: "bottom-0 w-full h-[850px]",
      },
      {
        src: "/assets/ornament-teknologi-3.png",
        className: "bottom-[200px] right-0 w-[370px] h-[370px]",
      },
    ],

    badgeAksiBg: "#E6EFFD",
    badgeDukunganBg: "#475D7D",
    bgColorDukungan: "#E6EFFD",
  },

  budaya: {
    bgColorPrimary: "#CC7A73",
    ColorBgHeader: "#FFD8D5",
    BadgeBuilderBg: "#30593F",
    sectionBg: "#FFD8D5",
    textColorPrimary: "#191919",
    textColorBuilder: "#FFFBE9",
    textColorSecondary: "#FFFBE9",
    ornaments: [
      {
        src: "/assets/ornament-budaya-1.png",
        className: "left-0 w-[420px] h-full",
      },
      {
        src: "/assets/ornament-budaya-2.png",
        className: "right-0 w-[420px] h-full",
      },
    ],

    badgeAksiBg: "#30593F",
    badgeDukunganBg: "#CC7A73",
    bgColorDukungan: "#30593F",
  },

  ekologi: {
    bgColorPrimary: "#4F956E",
    ColorBgHeader: "#30593F",
    BadgeBuilderBg: "#FDB62C",
    sectionBg: "#30593F",
    textColorPrimary: "#FFFBE9",
    textColorBuilder: "#191919",
    textColorSecondary: "#191919",
    ornaments: [
      {
        src: "/assets/ornament-ekologi-1.png",
        className: "top-0 left-0 w-[550px] h-[450px]",
      },
      {
        src: "/assets/ornament-ekologi-2.png",
        className: "top-0 right-0 w-[450px] h-[450px]",
      },
      {
        src: "/assets/ornament-ekologi-3.png",
        className: "bottom-0 left-0 w-[450px] h-[550px]",
      },
      {
        src: "/assets/ornament-ekologi-4.png",
        className: "bottom-0 right-0 w-[450px] h-[450px]",
      },
    ],

    badgeAksiBg: "#FDB62C",
    badgeDukunganBg: "#4F956E",
    bgColorDukungan: "#FDB62C",
  },

  politik: {
    bgColorPrimary: "#F77331",
    ColorBgHeader: "#FDB62C",
    BadgeBuilderBg: "#6C82A1",
    sectionBg: "#FDB62C",
    textColorPrimary: "#191919",
    textColorBuilder: "#FFFBE9",
    textColorSecondary: "#FFFBE9",
    ornaments: [
      {
        src: "/assets/ornament-politik-1.png",
        className: "bottom-0 left-0 w-[420px] h-[420px]",
      },
      {
        src: "/assets/ornament-politik-2.png",
        className: "right-0 w-[425px] h-full",
      },
      {
        src: "/assets/ornament-politik-3.png",
        className: "bottom-0 right-0 w-[460px] h-[460px]",
      },
    ],

    badgeAksiBg: "#6C82A1",
    badgeDukunganBg: "#F77331",
    bgColorDukungan: "#6C82A1",
  },

  sosial: {
    bgColorPrimary: "#CA3F34",
    ColorBgHeader: "#F77331",
    BadgeBuilderBg: "#FFF5D9",
    sectionBg: "#F77331",
    textColorPrimary: "#191919",
    textColorBuilder: "#191919",
    textColorSecondary: "#FFFBE9",
    ornaments: [
      {
        src: "/assets/ornament-sosial-1.png",
        className: "top-0 left-0 w-[350px] h-[450px]",
      },
      {
        src: "/assets/ornament-sosial-2.png",
        className: "top-0 right-0 w-[450px] h-[450px]",
      },
      {
        src: "/assets/ornament-sosial-3.png",
        className: "bottom-0 left-0 w-[450px] h-[550px]",
      },
      {
        src: "/assets/ornament-sosial-4.png",
        className: "bottom-0 right-0 w-[350px] h-[450px]",
      },
    ],

    badgeAksiBg: "#CA3F34",
    badgeDukunganBg: "#CA3F34",
    bgColorDukungan: "#FFF5D9",
  },
};
