import Hero from "@/components/Hero";
import TentangSection from "@/components/TentangSection";

const sections = [
  {
    bgColor: "#729E81",
    title: "Kolaboraya Sebagai Cara Interaksi",
    titleColor: "#FFFBE9",
    summary: `
      <strong>Komunikasi Raya adalah pendekatan yang menjadikan komunikasi sebagai strategi inti untuk mengakselerasi perubahan sosial.</strong> Lebih dari sekadar penyampaian informasi, Komunikasi Raya berfokus membangun koneksi mendalam di setiap interaksi, memfasilitasi pertukaran gagasan dan pemahaman dengan setara, serta menggerakkan aksi kolektif melalui komunikasi berbasis kekuatan dan harapan.
    `,
    summaryColor: "#FFFBE9",
    image: "/assets/bg-interaksi.png",
  },
  {
    bgColor: "#F0ACCF",
    title: "Kolaboraya Sebagai Platform",
    titleColor: "#191919",
    summary: `
      <strong>Kolaboraya adalah sebuah terminal (hub) yang menghubungkan penggerak perubahan dengan sumber daya yang mereka butuhkan untuk memperluas dampak.</strong> Melalui repositori pengetahuan dan jejaring kreator sosial, Kolaboraya hadir sebagai wadah memperkuat gerakan masyarakat sipil di Nusantara.
    `,
    summaryColor: "#5C5C5C",
    image: "/assets/bg-platform.png",
  },
  {
    bgColor: "#6E87A8",
    title: "Kolaboraya Sebagai Event",
    titleColor: "#FFFBE9",
    summary: `
     <strong>Pasar Kolaboraya adalah acara tahunan bagi kreator perubahan sosial, inovator, dan pembangun ekosistem perubahan di Indonesia untuk bersama-sama melepas sekat, membangun jembatan, dan mengubah gagasan menjadi gerakan. Lebih dari sebuah acara biasa,</strong> Pasar Kolaboraya adalah ruang liminal, sebuah ruang antara di mana semangat Connect, Collaborate, dan Change diwujudkan dalam laboratorium kolaborasi, festival ide, dan ruang transformatif.
    `,
    summaryColor: "#FFFBE9",
    image: "/assets/bg-event.png",
  },
];
export default function Tentang() {
  return (
    <div>
      <Hero
        title="Tentang Kolaboraya"
        summary="Diinisiasi oleh Roemah Inspirit, Kolaboraya dirancang sebagai ruang kolaboratif strategis untuk mendorong perubahan berdampak. 

Sebagai sebuah program, wadah, dan metode, Kolaboraya menghubungkan penggerak perubahan dari berbagai sektor dan latar belakang untuk bersama mewujudkan Indonesia lebih demokratis, inklusif, dan berkelanjutan.
"
      />
      {sections.map((item, index) => (
        <TentangSection key={index} {...item} />
      ))}
    </div>
  );
}
