"use client";

import { useEffect, useState } from "react";
import { BookOpenIcon, ArrowUpRightIcon } from "lucide-react";
import clsx from "clsx";

type Blog = {
  _id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  label?: string;
};

const hoverColors = [
  "hover:bg-[#FFF4E0]",
  "hover:bg-[#FFF8D6]",
  "hover:bg-[#FFF1C9]",
  "hover:bg-[#FAF3DD]",
  "hover:bg-[#FFEFBA]",
  "hover:bg-[#FFF9DB]",
  "hover:bg-[#FDF6EC]",
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://craftra-backend.onrender.com/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setFilteredBlogs(blogs.filter((blog) => blog.tags.includes(selectedTag)));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [selectedTag, blogs]);

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-10 font-sans">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-[#8B5E3C]">
        Discover Our Latest Blogs
      </h1>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => setSelectedTag(null)}
          className={clsx(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
            selectedTag === null
              ? "bg-[#8B5E3C] text-white"
              : "bg-white text-[#8B5E3C] border-gray-300 hover:bg-gray-100"
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={clsx(
              "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
              selectedTag === tag
                ? "bg-[#8B5E3C] text-white"
                : "bg-white text-[#8B5E3C] border-gray-300 hover:bg-gray-100"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-md border bg-white border-gray-200 animate-pulse space-y-4"
              >
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
                <div className="h-6 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="flex gap-2 mt-4">
                  <div className="h-6 w-14 bg-gray-200 rounded-full" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))
          : filteredBlogs.map((blog, i) => (
              <a
                key={blog._id}
                href={
                  blog.link.startsWith("http") ? blog.link : `https://${blog.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div
                  className={clsx(
                    "p-6 rounded-2xl shadow-md border transition-all duration-300",
                    "bg-white border-gray-200",
                    hoverColors[i % hoverColors.length],
                    "group-hover:scale-[1.02]"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3 text-gray-500">
                    <BookOpenIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {blog.label || "Creative Read"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-[#8B5E3C] group-hover:text-[#6B4226] transition">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mt-2 line-clamp-3 text-sm">
                    {blog.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#FAF1E4] text-xs px-3 py-1 rounded-full text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <span className="text-sm text-[#d49e00] group-hover:underline flex items-center gap-1 font-medium">
                      Read more <ArrowUpRightIcon className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
}
