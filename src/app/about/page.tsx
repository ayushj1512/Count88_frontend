"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Product = {
  _id: string;
  groupId: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  images: { url: string }[];
  price: number;
  discountPrice: number;
  variants: { size: string }[];
  isActive: boolean;
};

type FilterType = "price" | "size" | "color" | "discount" | "gender";

// ✅ Simple Sidebar Component
function FilterSidebar({
  filters,
  selected,
  toggleFilter,
}: {
  filters: Record<FilterType, string[]>;
  selected: Record<FilterType, string[]>;
  toggleFilter: (section: FilterType, option: string) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        {Object.entries(filters).map(([section, options]) => (
          <div key={section}>
            <h3 className="text-sm font-medium mb-2">{section}</h3>
            <div className="space-y-1">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selected[section as FilterType]?.includes(option) || false}
                    onChange={() => toggleFilter(section as FilterType, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollectionClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<
    "priceLowToHigh" | "priceHighToLow" | "alphabetical"
  >("priceLowToHigh");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<Record<FilterType, string[]>>({
    price: [],
    size: [],
    color: [],
    discount: [],
    gender: [],
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync filters with URL
  useEffect(() => {
    const getParams = (key: FilterType) => searchParams.getAll(key);
    setSelected({
      price: getParams("price"),
      size: getParams("size"),
      color: getParams("color"),
      discount: getParams("discount"),
      gender: getParams("gender"),
    });
  }, [searchParams]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    (Object.keys(selected) as FilterType[]).forEach((key) => {
      selected[key].forEach((val) => params.append(key, val));
    });
    router.replace(`?${params.toString()}`);
  }, [selected, router]);

  // Filter + sort products
  useEffect(() => {
    const filtered = products; // add filtering logic later
    const sorted = filtered.sort((a, b) => {
      if (sortOption === "priceLowToHigh") return a.discountPrice - b.discountPrice;
      if (sortOption === "priceHighToLow") return b.discountPrice - a.discountPrice;
      return a.name.localeCompare(b.name);
    });
    setFilteredProducts(sorted);
  }, [products, selected, sortOption]);

  // Toggle filter
  const handleToggleFilter = (type: FilterType, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const filterOptions: Record<FilterType, string[]> = {
    price: ["Under 1000", "1000-2000", "2000+"],
    size: ["UK 6", "UK 7", "UK 8", "UK 9"],
    color: ["Red", "Blue", "Black", "White"],
    discount: ["10", "20", "30", "50"],
    gender: ["Men", "Women", "Kids"],
  };

  return (
    <div className="flex max-w-full">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-64 border-r p-4">
        <FilterSidebar
          filters={filterOptions}
          selected={selected}
          toggleFilter={handleToggleFilter}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile Filter Toggle + Sort */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            className="md:hidden border px-3 py-1 rounded-md text-sm"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            {mobileFiltersOpen ? "Close Filters" : "Filters"}
          </button>

          <AnimatePresence>
            <motion.div
              key={sortOption}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm"
            >
              <FaSortAmountDown className="text-gray-500" />
              <select
                className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value as "priceLowToHigh" | "priceHighToLow" | "alphabetical"
                  )
                }
              >
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Sidebar */}
        {mobileFiltersOpen && (
          <div className="md:hidden mb-4 border p-4 rounded-md bg-gray-50">
            <FilterSidebar
              filters={filterOptions}
              selected={selected}
              toggleFilter={handleToggleFilter}
            />
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-72 rounded-xl"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const mrp = product.price;
                const price = product.discountPrice;
                const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                const primaryImage = product.images?.[0]?.url || "https://via.placeholder.com/300";
                const secondaryImage = product.images?.[1]?.url || primaryImage;

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative bg-white rounded-xl border shadow-md group overflow-hidden flex flex-col h-full hover:shadow-2xl hover:border-red-900 transition-all duration-300">
                      <Link
                        href={`/collection/${product.slug}`}
                        className="flex-1 flex flex-col"
                      >
                        <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                          <Image
                            src={primaryImage}
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90 group-hover:opacity-0"
                          />
                          <Image
                            src={secondaryImage}
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-xl absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:brightness-100"
                          />
                          {discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-900 text-white text-xs font-bold px-2 py-1 rounded">
                              {discount}% OFF
                            </div>
                          )}
                          {product.tags?.length ? (
                            <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
                              {product.tags?.map((tag, i) => (
                                <span
                                  key={i}
                                  className="bg-black/80 text-white text-[10px] px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="p-4 flex flex-col gap-1">
                          <h4 className="text-gray-900 font-semibold text-sm sm:text-md truncate">
                            {product.name}
                          </h4>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {product.brand}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {mrp > price ? (
                              <>
                                <span className="line-through text-gray-400 text-xs sm:text-sm">
                                  ₹{mrp}
                                </span>
                                <span className="text-black font-bold text-sm sm:text-base">
                                  ₹{price}
                                </span>
                              </>
                            ) : (
                              <span className="text-black font-bold text-sm sm:text-base">
                                ₹{price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!filteredProducts.length && !loading && (
          <p className="text-center text-gray-600 mt-10">No products found.</p>
        )}
      </main>
    </div>
  );
}
