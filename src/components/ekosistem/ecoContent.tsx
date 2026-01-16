import { EkosistemTheme } from "@/data/ekosistemTheme";
import Image from "next/image";

type Props = {
  data: {
    title: string;
    summary: string;
    dukungan: string;
  };
  theme: EkosistemTheme;
};

export default function EcoContent({ data, theme }: Props) {
  return (
    <section
      className={"relative w-full"}
      style={{ backgroundColor: theme.sectionBg }}
    >
      {/* Ornaments */}
      {theme.ornaments.map((ornament, i) => (
        <div key={i} className={`absolute ${ornament.className}`}>
          <Image
            src={ornament.src}
            alt="ornament"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-16">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Badge Head */}
          <div
            className="w-fit px-4 py-4  rounded-[14px] flex items-center"
            style={{ backgroundColor: theme.badgeAksiBg }}
          >
            <span
              className={`font-bruliafont text-[40px] leading-[56px] ${
                theme.textColorSecondary
                  ? `text-[${theme.textColorSecondary}]`
                  : "text-[#FFFBE9]"
              }`}
            >
              AKSI KOLEKTIF
            </span>
          </div>

          {/* Title */}
          <h1
            className={`font-bruliafont ${
              theme.textColorPrimary
                ? `text-[${theme.textColorPrimary}]`
                : "text-[#FFFBE9]"
            } text-[64px] leading-[80px] font-bold`}
          >
            {data.title}
          </h1>

          {/* Summary */}
          <p
            className={`max-w-[900px] text-xl leading-[24px] text-center ${
              theme.textColorPrimary
                ? `text-[${theme.textColorPrimary}]`
                : "text-[#FFFBE9]"
            } font-semibold`}
          >
            {data.summary}
          </p>

          {/* Collective Support Box */}
          <div
            className="relative mt-20 rounded-[56px] p-20 max-w-[1000px] w-full"
            style={{ backgroundColor: theme.bgColorDukungan }}
          >
            {/* Floating Badge */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <div
                className="px-5 py-3  rounded-[14px]"
                style={{ backgroundColor: theme.badgeDukunganBg }}
              >
                <span className="font-bruliafont text-xl text-[#FFFBE9]">
                  DUKUNGAN KOLEKTIF
                </span>
              </div>
            </div>

            {/* Support Summary */}
            <p
              className={`${
                theme.textColorBuilder
                  ? `text-[${theme.textColorBuilder}]`
                  : "text-[#FFFBE9]"
              } text-xl leading-[24px] text-center font-semibold`}
            >
              {data.dukungan}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
