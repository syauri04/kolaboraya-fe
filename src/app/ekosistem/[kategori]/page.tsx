import EcoBuilder from "@/components/ekosistem/ecoBuilder";
import EcoContent from "@/components/ekosistem/ecoContent";
import EcoGallery from "@/components/ekosistem/ecoGallery";
import EkoHead from "@/components/ekosistem/ekoHead";
import { ekosistemDummy } from "@/data/ekosistem";
import { ekosistemThemeMap } from "@/data/ekosistemTheme";

type Props = {
  params: Promise<{
    kategori: string;
  }>;
};

export default async function DetailEkosistem({ params }: Props) {
  const { kategori } = await params;

  const data = ekosistemDummy.find((item) => item.slug === kategori);
  const theme = ekosistemThemeMap[kategori];

  if (!data) {
    return <div>Ekosistem tidak ditemukan</div>;
  }

  return (
    <section
      className="relative  mt-[85px]"
      style={{ backgroundColor: theme.bgColorPrimary }}
    >
      <EkoHead
        data={data.head}
        theme={theme.ColorBgHeader}
        textColor={theme.textColorPrimary}
      />
      <EcoBuilder
        data={data.builder}
        colorBadge={theme.BadgeBuilderBg}
        colorText={theme.textColorBuilder}
      />
      <EcoContent data={data.content} theme={theme} />
      <EcoGallery data={data.gallery} />
    </section>
  );
}
