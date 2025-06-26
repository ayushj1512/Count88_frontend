"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpenIcon, ArrowUpRightIcon } from "lucide-react";

type Blog = {
    _id: string;
    title: string;
    description: string;
    link: string;
    tags: string[];
    label?: string;
};

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://craftra-backend.onrender.com/api/blogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setFilteredBlogs(data);
            })
            .catch((err) => console.error("Failed to fetch blogs", err));
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
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Explore Our Blogs</h1>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedTag === null
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedTag === tag
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                    <Link
                        key={blog._id}
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 group-hover:border-black">
                            <div className="flex items-center gap-3 mb-3 text-gray-600">
                                <BookOpenIcon className="w-5 h-5" />
                                <span className="text-sm">{blog.label || "Creative Read"}</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-black transition">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 mt-2 line-clamp-3">{blog.description}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-xs px-2.5 py-1 rounded-full text-gray-700"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex justify-end">
                                <span className="text-sm text-blue-600 group-hover:underline flex items-center gap-1">
                                    Read more <ArrowUpRightIcon className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
