"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CardSectionSenarai from "./CardSectionSenarai";

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
  title: string;
  summary: string;
};

export default function BlogSenarai({
  posts,
  postsPerPage = 9,
  title,
  summary,
}: BlogSenaraiProps) {
  // Featured = post pertama (paling baru)
  const featuredPost = posts[0];

  // Sisanya = posts tanpa featured
  const otherPosts = posts.slice(1);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(otherPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = otherPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="container mx-auto px-3 sm:px-6 py-14 md:py-20">
      <CardSectionSenarai title={title} summary={summary} />
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
    </section>
  );
}
