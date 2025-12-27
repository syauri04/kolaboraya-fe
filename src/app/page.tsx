import AgendaSection from "@/components/AgendaSection";
import Hero from "@/components/Hero";
import Kolaborasi from "@/components/Kolaborasi";
import KolaboratorSection from "@/components/KolaboratorSection";
import KolaborayaSection from "@/components/KolaborayaSection";
import ProdukKolaborasi from "@/components/ProdukKolaborasi";
import SenaraiSection from "@/components/SenaraiSection";
import { fetchLatestAgendas } from "@/services/agenda";
import { fetchHero, formatHero } from "@/services/hero";
import {
  fetchHome,
  formatHomeKolaborasi,
  formatHomeKolaborator,
  formatHomeOnText,
  formatHomeSenarai,
} from "@/services/home";
import { fetchProdukCategories } from "@/services/produk";

export default async function Home() {
  const hero = await fetchHero();
  const heroData = formatHero(hero);

  const homeFetch = await fetchHome();
  const homeKolaborasiData = formatHomeKolaborasi(homeFetch);
  const onTextData = formatHomeOnText(homeFetch);
  const homeSenaraiData = formatHomeSenarai(homeFetch);
  const homeKolaboratorData = formatHomeKolaborator(homeFetch);

  const latestAgendas = await fetchLatestAgendas();
  const categoryProduk = await fetchProdukCategories();
  return (
    <>
      <Hero summary={heroData.titleHome} images={heroData.images} page="home" />
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
