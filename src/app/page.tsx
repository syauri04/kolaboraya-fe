import AgendaSection from "@/components/AgendaSection";
import Hero from "@/components/Hero";
import Kolaborasi from "@/components/Kolaborasi";
import KolaboratorSection from "@/components/KolaboratorSection";
import KolaborayaSection from "@/components/KolaborayaSection";
import ProdukKolaborasi from "@/components/ProdukKolaborasi";
import SenaraiSection from "@/components/SenaraiSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum fringilla tortor, vel lobortis lorem blandit consectetur. Curabitur eros dolor, sollicitudin ut risus vel, efficitur viverra lorem. Vivamus volutpat, massa egestas consectetur dignissim, nisi purus volutpat turpis, in laoreet enim purus sed nibh." />
      <Kolaborasi />
      <KolaborayaSection />
      <AgendaSection />
      <SenaraiSection
        text={`Tahukah kamu ada banyak kisah luar biasa di dalam ekosistem masyarakat sipil?\n\nCerita dari Ekosistem adalah ruang ekspresi untuk merayakan setiap langkah mewujudkan perubahan baik.\n\nJelajahi halaman ini untuk menemukan inspirasi dan ikut bagikan cerita perubahanmu!`}
        showButton
        buttonLabel="Selengkapnya"
        buttonHref="/senarai-cerita"
      />
      <ProdukKolaborasi />
      <KolaboratorSection />
    </>
  );
}
