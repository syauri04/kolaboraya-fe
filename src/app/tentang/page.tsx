import Hero from "@/components/Hero";
import TentangSection from "@/components/TentangSection";
import { fetchHero, formatHero } from "@/services/hero";
import { fetchTentang } from "@/services/tentang";

const sections = await fetchTentang();
export default async function Tentang() {
  const hero = await fetchHero();
  const heroData = formatHero(hero);
  return (
    <div>
      <Hero
        title={heroData.titleAbout}
        summary={heroData.summaryAbout}
        images={heroData.images}
      />
      {sections.map((item) => (
        <TentangSection
          key={item.id}
          bgColor={item.bgColor}
          title={item.title}
          titleColor={item.titleColor}
          summary={item.summary}
          summaryColor={item.summaryColor}
          image={item.image}
        />
      ))}
    </div>
  );
}
