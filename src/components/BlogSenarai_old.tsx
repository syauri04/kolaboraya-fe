"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  postsPerPage?: number;
};

export default function BlogSenarai_old({
  posts,
  postsPerPage = 9,
}: BlogSenaraiProps) {
  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(otherPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = otherPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      <div className="w-full bg-[#386366] rounded-[27px] p-24 text-center mb-18">
        <h2 className="font-bruliafont text-4xl text-[#FFFBE9] mb-4">
          Ruang Antara Pasar Kolaboraya 2025
        </h2>

        <p className="text-2xl text-[#FFFBE9] leading-[29px]">
          Kesan menjelajahi Ruang Antara dari para Kreator, Ecosystem Builders,
          dan penggerak perubahan yang terlibat dalam Pasar Kolaboraya 2025.
        </p>
      </div>
      {/* 🌟 Featured */}
      {featuredPost && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-18 sm:mb-24 items-center">
          <div className="relative aspect-[620/402] rounded-[18px] overflow-hidden">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover rounded-[18px]"
            />
          </div>

          <div>
            <Link href={`/senarai-cerita/${featuredPost.slug}`}>
              <h2 className="text-2xl sm:text-4xl font-bruliafont text-primary hover:text-[#EDB133] transition mb-4">
                {featuredPost.title}
              </h2>
            </Link>

            <p className="text-primary text-base sm:text-lg mb-4">
              {featuredPost.summary}
            </p>

            <p className="text-primary text-base sm:text-lg">
              {featuredPost.date}
            </p>
          </div>
        </div>
      )}

      {/* 📰 Grid Blog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {currentPosts.map((post) => (
          <div key={post.id} className="flex flex-col">
            <Link href={`/senarai-cerita/${post.slug}`}>
              <div className="relative aspect-[390/219] rounded-[18px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-[18px]"
                />
              </div>

              <h3 className="text-lg sm:text-2xl font-bruliafont text-primary hover:text-[#EDB133] mt-4 mb-2">
                {post.title}
              </h3>

              <p className="text-primary text-base sm:text-lg">{post.date}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-[#386366] text-white border-[#386366]"
                  : "bg-white"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
