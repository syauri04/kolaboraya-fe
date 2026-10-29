export default function CardSectionSenarai({
  title,
  summary,
  bgColor,
}: {
  title: string;
  summary: string;
  bgColor?: string;
}) {
  return (
    <div
      className="w-full rounded-[27px] p-8 md:p-14 lg:p-24 text-center mb-18"
      style={{ backgroundColor: bgColor || "#386366" }}
    >
      <h2 className="font-bruliafont text-2xl md:text-3xl lg:text-4xl text-[#FFFBE9] mb-4">
        {title}
      </h2>

      <p className="text-base md:text-xl lg:text-2xl text-[#FFFBE9] leading-normal lg:leading-[29px]">
        {summary}
      </p>
    </div>
  );
}
