"use client";
import Image from "next/image";
import { useState } from "react";

// ✅ Type untuk blog post (bisa disesuaikan dengan Strapi)
export type BlogPost = {
  id: number;
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

export default function BlogSenarai({ posts, postsPerPage = 9 }: BlogSenaraiProps) {
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
    <section className="container mx-auto px-6 py-24">
      {/* 🌟 Featured Blog */}
      {featuredPost && (
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div className="relative aspect-[620/402] rounded-[18px] overflow-hidden">
            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover rounded-[18px]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">{featuredPost.title}</h2>
            <p className="text-gray-600 mb-4">{featuredPost.summary}</p>
            <p className="text-sm text-gray-500">{featuredPost.date}</p>
          </div>
        </div>
      )}

      {/* 📰 Blog List */}
      <div className="grid md:grid-cols-3 gap-10">
        {currentPosts.map((post) => (
          <div key={post.id} className="flex flex-col">
            <div className="relative aspect-[390/219] rounded-[18px] overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover rounded-[18px]" />
            </div>
            <h3 className="text-lg font-medium mt-4 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-[#386366] text-white border-[#386366]" : "bg-white"}`}>
              {page}
            </button>
          );
        })}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">
          Next
        </button>
      </div>
    </section>
  );
}
