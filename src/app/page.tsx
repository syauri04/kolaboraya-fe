import AgendaSection from "@/components/AgendaSection";
import Hero from "@/components/Hero";
import HeroSlider from "@/components/HeroSlider";
import Kolaborasi from "@/components/Kolaborasi";
import KolaboratorSection from "@/components/KolaboratorSection";
import KolaborayaSection from "@/components/KolaborayaSection";
import ProdukKolaborasi from "@/components/ProdukKolaborasi";
import SenaraiSection from "@/components/SenaraiSection";
import { fetchLatestAgendas } from "@/services/agenda";
import { fetchHero, fetchHeroSlider, formatHero } from "@/services/hero";
import {
  fetchHome,
  formatHomeKolaborasi,
  formatHomeKolaborator,
  formatHomeOnText,
  formatHomeSenarai,
} from "@/services/home";
import { fetchProdukCategories } from "@/services/produk";

const slides = [
  {
    id: 1,
    image: "/assets/bg-culture-blue.png",
    title: "Pasar Kolaboraya 2026",
    summary:
      "Pasar Kolaboraya 2026 dirancang sebagai ruang temu yang intim bagi para Ecosystem Builder. Untuk menjaga kehangatan dan fokus pada pembelajaran bersama, pertemuan tahun ini diselenggarakan secara khusus untuk undangan terbatas.",
    buttonText: "Kenali Lebih Lanjut",
    buttonHref: "https://pk2026.kolaboraya.id/",
  },
  {
    id: 2,
    image: "/assets/2025-1.png",
    title: "Connect Collaborate Change",
    summary:
      "Roemi bekerja memperkuat gerakan masyarakat sipil, mendorong gerakan bersama untuk mewujudkan ekosistem yang tangguh, terhubung, dan saling dukung.",
    buttonText: "Kenali Lebih Lanjut",
    buttonHref: "https://www.roemahinspirit.id/",
  },
  // ...slide lainnya
];

export default async function Home() {
  const hero = await fetchHero();
  const heroData = formatHero(hero);

  const heroSlider = await fetchHeroSlider();

  console.log("heroslider", heroSlider);

  const homeFetch = await fetchHome();
  const homeKolaborasiData = formatHomeKolaborasi(homeFetch);
  const onTextData = formatHomeOnText(homeFetch);
  const homeSenaraiData = formatHomeSenarai(homeFetch);
  const homeKolaboratorData = formatHomeKolaborator(homeFetch);

  const latestAgendas = await fetchLatestAgendas();
  const categoryProduk = await fetchProdukCategories();
  return (
    <>
      <HeroSlider slides={heroSlider} />
      {/* <Hero summary={heroData.titleHome} images={heroData.images} page="home" /> */}
      <Kolaborasi data={homeKolaborasiData} />
      <KolaborayaSection summaryCircle={homeKolaborasiData.summaryCircle} />
      {/* <AgendaSection onText={onTextData} agendas={latestAgendas} /> */}
      <SenaraiSection
        text={homeSenaraiData.summarySenarai}
        images={homeSenaraiData.images}
        showButton
        buttonLabel="Selengkapnya"
        buttonHref="/senarai-cerita"
      />
      <ProdukKolaborasi category={categoryProduk} />
      {/* <KolaboratorSection logos={homeKolaboratorData.logos} /> */}
    </>
  );
}
