"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  discountPrice: number;
  images: { url: string }[];
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const debouncedQuery = useDebounce(query, 500);

  const saveRecentSearch = useCallback(
    (term: string) => {
      if (!term) return;
      let updated = [term, ...recentSearches.filter((t) => t !== term)];
      updated = updated.slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },
    [recentSearches]
  );

  const removeRecentSearch = (term: string) => {
    const updated = recentSearches.filter((t) => t !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const fetchProducts = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products?search=${encodeURIComponent(searchTerm)}`
        );
        const data: Product[] = await res.json();

        // ✅ Filter only by product.name
        const filtered = data.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(filtered);
        saveRecentSearch(searchTerm);
        setLastSearched(searchTerm);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL, saveRecentSearch]
  );

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== lastSearched) {
      fetchProducts(debouncedQuery);
    }
  }, [debouncedQuery, lastSearched, fetchProducts]);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-white pb-4 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#7a0d2e] mb-4">
          Search Products
        </h1>

        <input
          type="text"
          placeholder="Search by product name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]"
        />
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-2">
          <h2 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, i) => (
              <div
                key={i}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                <button onClick={() => setQuery(term)}>{term}</button>
                <X
                  size={14}
                  className="ml-2 text-gray-500 hover:text-red-500"
                  onClick={() => removeRecentSearch(term)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-[#7a0d2e]" size={28} />
          </div>
        ) : products.length === 0 && debouncedQuery ? (
          <p className="text-gray-500 text-center mt-6">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-3 sm:p-4 bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="relative w-full h-36 sm:h-40 mb-3">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {product.brand}
                </p>
                <div className="mt-2 flex gap-2 items-center">
                  <span className="font-bold text-[#7a0d2e] text-sm sm:text-base">
                    ₹{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="line-through text-gray-400 text-xs sm:text-sm">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
