"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

type Variant = { size: string };
type ImageType = { url: string; public_id: string };
type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number;
  brand: string;
  category: string;
  subcategory?: string;
  createdAt: string;
  images: ImageType[];
  variants: Variant[];
};

export default function CollectionClient() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("");

  const categories = ["asas", "dfg", "Other"];
  const subcategories = ["dfg", "xyz", "Other"];
  const allSizes = ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9"];

  // Mobile collapsible sections
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (category) temp = temp.filter((p) => p.category === category);
    if (subcategory) temp = temp.filter((p) => p.subcategory === subcategory);
    if (sizes.length > 0)
      temp = temp.filter((p) => p.variants.some((v) => sizes.includes(v.size)));
    temp = temp.filter(
      (p) => p.discountPrice >= priceRange[0] && p.discountPrice <= priceRange[1]
    );

    if (sortBy === "low") temp.sort((a, b) => a.discountPrice - b.discountPrice);
    if (sortBy === "high") temp.sort((a, b) => b.discountPrice - a.discountPrice);
    if (sortBy === "newest")
      temp.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredProducts(temp);

    // Update URL
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (subcategory) query.set("subcategory", subcategory);
    if (sizes.length > 0) query.set("sizes", sizes.join(","));
    if (priceRange[1] < 1000) query.set("price", priceRange[1].toString());
    if (sortBy) query.set("sort", sortBy);
    router.replace(`/collection?${query.toString()}`);
  }, [category, subcategory, sizes, priceRange, sortBy, products, router]);

  const toggleSize = (s: string) =>
    setSizes(sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s]);

  const clearAllFilters = () => {
    setCategory("");
    setSubcategory("");
    setSizes([]);
    setPriceRange([0, 1000]);
    setSortBy("");
  };

  const renderRadioFilter = (
    title: string,
    options: string[],
    selected: string,
    onChange: (val: string) => void
  ) => (
    <div className="space-y-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={title}
            value={opt}
            checked={selected === opt}
            onChange={() => onChange(opt)}
            className="accent-gray-800"
          />
          {opt}
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-4 flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 mr-4">
        <div className="border p-4 rounded space-y-6">
          

          <h3 className="font-bold text-lg mt-4">Categories</h3>
          {renderRadioFilter("category", categories, category, setCategory)}

          <h3 className="font-bold text-lg mt-4">Subcategories</h3>
          {renderRadioFilter("subcategory", subcategories, subcategory, setSubcategory)}

          <h3 className="font-bold text-lg mt-4">Sizes</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`border px-2 py-1 rounded ${
                  sizes.includes(s) ? "bg-gray-800 text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <h3 className="font-bold text-lg mt-4">Price</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
          </div>
          <button
            onClick={clearAllFilters}
            className="bg-red-600 text-white px-2 py-1 rounded w-full"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
          {/* Mobile Filters button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 border px-2 py-1 rounded md:hidden"
          >
            <SlidersHorizontal /> Filters
          </button>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded ml-auto"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div>Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div>No products found</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredProducts.map((p) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/collection/${p.slug}`)}
                  >
                    <img
                      src={p.images[0]?.url}
                      alt={p.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.brand}</p>
                      <p className="mt-1">
                        ₹{p.discountPrice}{" "}
                        <span className="line-through text-gray-400">₹{p.price}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 bg-white z-50 w-64 p-4 shadow-lg overflow-y-auto"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowMobileFilters(false)}>
                <X />
              </button>
            </div>

            <button
              onClick={clearAllFilters}
              className="bg-red-600 text-white px-2 py-1 rounded mb-4 w-full"
            >
              Clear All Filters
            </button>

            {/* Collapsible Category */}
            <div>
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <h3 className="font-bold text-lg">Categories</h3>
                {categoryOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 overflow-hidden mt-2"
                  >
                    {renderRadioFilter("category", categories, category, setCategory)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Collapsible Subcategory */}
            <div className="mt-4">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => setSubcategoryOpen(!subcategoryOpen)}
              >
                <h3 className="font-bold text-lg">Subcategories</h3>
                {subcategoryOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              <AnimatePresence>
                {subcategoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 overflow-hidden mt-2"
                  >
                    {renderRadioFilter("subcategory", subcategories, subcategory, setSubcategory)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Collapsible Sizes */}
            <div className="mt-4">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => setSizeOpen(!sizeOpen)}
              >
                <h3 className="font-bold text-lg">Sizes</h3>
                {sizeOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              <AnimatePresence>
                {sizeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-wrap gap-2 mt-2 overflow-hidden"
                  >
                    {allSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`border px-2 py-1 rounded ${
                          sizes.includes(s) ? "bg-gray-800 text-white" : ""
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Collapsible Price */}
            <div className="mt-4">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => setPriceOpen(!priceOpen)}
              >
                <h3 className="font-bold text-lg">Price</h3>
                {priceOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
              <AnimatePresence>
                {priceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 space-y-2 overflow-hidden"
                  >
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1000}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
