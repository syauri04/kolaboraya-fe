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

export default function BlogSenaraiFour({
  posts,
  title,
  summary,
}: BlogSenaraiProps) {
  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      <CardSectionSenarai title={title} summary={summary} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {posts.map((item) => {
          return (
            <div className="w-full" key={item.id}>
              <Link href={`/senarai-cerita/${item.slug}`}>
                <div className="relative w-full aspect-[264/338]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-[18px]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                <h3 className="font-bruliafont text-xl md:text-2xl md:leading-[34px] text-primary mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-primary text-base sm:text-lg">{item.date}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
