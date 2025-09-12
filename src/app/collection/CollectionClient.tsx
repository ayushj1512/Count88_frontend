"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import Image from "next/image";
import FilterBar from "../components/FilterSidebar";

type Product = {
  _id: string;
  groupId: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  description?: string[] | string;
  images: { url: string }[];
  variants: {
    variant: string;
    mrp: number;
    discountedPrice: number;
  }[];
  isActive: boolean;
};

type FilterType = "price" | "size" | "color" | "discount" | "gender";

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

  const addToCart = useCartStore((state) => state.addToCart);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
        );
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

  useEffect(() => {
    const params = new URLSearchParams();
    (Object.keys(selected) as FilterType[]).forEach((key) => {
      selected[key].forEach((val) => params.append(key, val));
    });

    router.replace(`?${params.toString()}`);
  }, [selected, router]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const priceMatch =
        !selected.price.length ||
        selected.price.includes(p.variants?.[0]?.discountedPrice.toString());
      const sizeMatch =
        !selected.size.length || selected.size.includes(p.subcategory || "");
      const colorMatch =
        !selected.color.length ||
        (p.tags && p.tags.some((t) => selected.color.includes(t)));
      const discountMatch =
        !selected.discount.length ||
        selected.discount.includes(
          Math.round(
            ((p.variants?.[0]?.mrp - p.variants?.[0]?.discountedPrice) /
              (p.variants?.[0]?.mrp || 1)) *
              100
          ).toString()
        );
      const genderMatch =
        !selected.gender.length || selected.gender.includes(p.category);

      return priceMatch && sizeMatch && colorMatch && discountMatch && genderMatch;
    });

    const sorted = filtered.sort((a, b) => {
      const aPrice = a.variants?.[0]?.discountedPrice ?? 0;
      const bPrice = b.variants?.[0]?.discountedPrice ?? 0;
      if (sortOption === "priceLowToHigh") return aPrice - bPrice;
      if (sortOption === "priceHighToLow") return bPrice - aPrice;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(sorted);
  }, [products, selected, sortOption]);

  const toggleFilter = (type: FilterType, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  // Example options (replace with real dynamic values if needed)
  const filters = {
    price: ["Under 1000", "1000-2000", "2000+"],
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Black", "White"],
    discount: ["10", "20", "30", "50"], // %
    gender: ["Men", "Women", "Kids"],
  };

  return (
    <div className="max-w-full px-6 py-8">
      {/* Filter Bar + Sort in one row */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <FilterBar
          filters={filters}
          selected={selected}
          toggleFilter={toggleFilter}
        />

        <div className="flex items-center gap-2 text-sm">
          <FaSortAmountDown className="text-gray-500" />
          <select
            className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value as
                  | "priceLowToHigh"
                  | "priceHighToLow"
                  | "alphabetical"
              )
            }
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <p className="text-gray-700 text-sm mb-4">
        {filteredProducts.length} of {products.length} products
      </p>

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-72 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const image =
                product.images?.[0]?.url || "https://via.placeholder.com/300";
              const mrp = product.variants?.[0]?.mrp ?? 0;
              const price = product.variants?.[0]?.discountedPrice ?? 0;
              const discount =
                mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
              const slug = product.slug;

              return (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative bg-white rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full">
                    <Link
                      href={slug ? `/collection/${slug}` : "#"}
                      onClick={(e) => {
                        if (!slug) {
                          e.preventDefault();
                          toast.error("Product link not available");
                        }
                      }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        {discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-900 text-white text-xs font-bold px-2 py-1 rounded">
                            {discount}% OFF
                          </div>
                        )}
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
                    <div className="p-4 pt-2">
                      <button
                        onClick={() => {
                          addToCart({
                            id: product._id,
                            title: product.name,
                            image: image,
                            price: price,
                          });
                          toast.success(`${product.name} added to cart`);
                        }}
                        className="w-full py-2 rounded-md bg-black text-white hover:bg-red-900 transition-colors duration-300 text-sm font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
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
    </div>
  );
}
