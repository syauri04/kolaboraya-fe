import Image from "next/image";
import CardSectionSenarai from "./CardSectionSenarai";
import Link from "next/link";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  featured: boolean;
};

type BlogSenaraiProps = {
  posts: BlogPost[];
  title: string;
  summary: string;
};

export default function BlogSenaraiTwo({
  posts,
  title,
  summary,
}: BlogSenaraiProps) {
  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      {/* SECTION TITLE */}
      <CardSectionSenarai title={title} summary={summary} />

      {/* GRID 2 KOLOM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.slice(0, 2).map((item) => {
          return (
            <div className="w-full" key={item.id}>
              {/* IMAGE */}
              <Link href={`/senarai-cerita/${item.slug}`}>
                <div className="relative w-full aspect-[614/329]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-[18px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* TITLE */}
                <h3 className="font-bruliafont text-xl md:text-2xl leading-[34px] text-primary mt-4">
                  {item.title}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
