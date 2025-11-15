"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ✅ Type untuk blog post (bisa disesuaikan dengan Strapi)
export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  image: string;
  date: string;
  featured?: boolean;
};

// ✅ Props untuk komponen
type BlogSenaraiProps = {
  posts: BlogPost[];
  postsPerPage?: number;
};

export default function BlogSenarai({
  posts,
  postsPerPage = 9,
}: BlogSenaraiProps) {
  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(otherPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = otherPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      {/* 🌟 Featured Blog */}
      {featuredPost && (
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-10 mb-18 sm:mb-24 items-center">
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
              <h2 className="text-2xl sm:text-4xl leading-[120%] sm:leading-[50px] font-bruliafont text-primary hover:text-[#EDB133] transition cursor-pointer mb-4">
                {featuredPost.title}
              </h2>
            </Link>

            <p className="text-primary text-base sm:text-lg leading-[120%] sm:leading-[22px] mb-4">
              {featuredPost.summary}
            </p>
            <p className="text-primary text-base sm:text-lg leading-[120%] sm:leading-[22px] ">
              {featuredPost.date}
            </p>
          </div>
        </div>
      )}

      {/* 📰 Blog List */}
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
              <h3 className="text-lg sm:text-2xl leading-[120%] sm:leading-[34px] font-bruliafont text-primary hover:text-[#EDB133] transition cursor-pointer mt-4 mb-2">
                {post.title}
              </h3>
              <p className="text-primary text-base sm:text-lg leading-[120%] sm:leading-[22px]">
                {post.date}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
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
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
