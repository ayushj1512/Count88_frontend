"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Heart } from "lucide-react";
import Image from "next/image";
import FilterSidebar from "../components/collectionPage/FilterSidebar";
import { useAuthStore } from "../store/useAuthStore";

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

type WishlistItem = {
  _id: string;
  productId: Product;
};

export default function CollectionClient() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("");

  const categories = ["asas", "dfg", "Other"];
  const subcategories = ["dfg", "xyz", "Other"];
  const allSizes = ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9"];

  // Fetch products
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch wishlist for authenticated user
  useEffect(() => {
    if (!user?.uid) return;

    axios
      .get<{ message: string; data: WishlistItem[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/${user.uid}`
      )
      .then((res) => {
        const wishlistIds = res.data.data.map((item) => item.productId._id);
        setWishlist(wishlistIds);
      })
      .catch(() => setWishlist([]));
  }, [user?.uid]);

  // Filter products
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

  // Toggle wishlist
  const toggleWishlist = async (productId: string) => {
    if (!user?.uid) return;
    try {
      if (wishlist.includes(productId)) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/remove`, {
          userId: user.uid,
          productId,
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/add`, {
          userId: user.uid,
          productId,
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  return (
    <div className="p-4 flex min-h-screen">
      <FilterSidebar
        categories={categories}
        subcategories={subcategories}
        allSizes={allSizes}
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        sizes={sizes}
        toggleSize={toggleSize}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        clearAllFilters={clearAllFilters}
        showMobile={showMobileFilters}
        setShowMobile={setShowMobileFilters}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 border px-2 py-1 rounded md:hidden"
          >
            <SlidersHorizontal /> Filters
          </button>

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
                    className="border rounded shadow hover:shadow-lg cursor-pointer overflow-hidden relative"
                  >
                    <div onClick={() => router.push(`/collection/${p.slug}`)} className="relative w-full h-48">
                      {p.images[0]?.url && (
                        <Image
                          src={p.images[0].url}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(p._id)}
                      className="absolute top-2 right-2 text-red-600 z-10"
                    >
                      <Heart
                        fill={wishlist.includes(p._id) ? "red" : "none"}
                        stroke="currentColor"
                        className="w-6 h-6"
                      />
                    </button>

                    <div className="p-2">
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.brand}</p>
                      <p className="mt-1">
                        ₹{p.discountPrice}{" "}
                        <span className="line-through text-gray-400">{p.price}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
