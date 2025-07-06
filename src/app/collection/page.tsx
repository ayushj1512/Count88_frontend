'use client';

import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import Image from 'next/image';
import '../components/loader2.css'; // <-- Important: loader2.css

type Product = {
  _id: string;
  groupId: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  description?: string[] | string;
  tags?: string[];
  images: { url: string }[];
  variants: {
    variant: string;
    mrp: number;
    discountedPrice: number;
  }[];
  isActive: boolean;
};

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<'priceLowToHigh' | 'priceHighToLow' | 'alphabetical'>('priceLowToHigh');
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const catMatch = !selectedCategories.length || selectedCategories.includes(p.category);
      const subcatMatch = !selectedSubcategories.length || selectedSubcategories.includes(p.subcategory || '');
      const brandMatch = !selectedBrands.length || selectedBrands.includes(p.brand || '');
      return catMatch && subcatMatch && brandMatch;
    });

    const sorted = filtered.sort((a, b) => {
      const aPrice = a.variants?.[0]?.discountedPrice ?? 0;
      const bPrice = b.variants?.[0]?.discountedPrice ?? 0;
      if (sortOption === 'priceLowToHigh') return aPrice - bPrice;
      if (sortOption === 'priceHighToLow') return bPrice - aPrice;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(sorted);
  }, [products, selectedCategories, selectedSubcategories, selectedBrands, sortOption]);

  const toggleFilter = (type: 'category' | 'subcategory' | 'brand', value: string) => {
    const toggle = (list: string[], value: string) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

    if (type === 'category') setSelectedCategories(toggle(selectedCategories, value));
    if (type === 'subcategory') setSelectedSubcategories(toggle(selectedSubcategories, value));
    if (type === 'brand') setSelectedBrands(toggle(selectedBrands, value));
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const subcategories = Array.from(new Set(products.map((p) => p.subcategory).filter((s): s is string => !!s)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          categories={categories}
          subcategories={subcategories}
          brands={brands}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
          selectedBrands={selectedBrands}
          toggleFilter={toggleFilter}
        />

        <main className="flex-1 relative min-h-[300px]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <p className="text-gray-700 text-sm">
              {filteredProducts.length} of {products.length} products
            </p>

            <div className="flex items-center gap-2 text-sm">
              <FaSortAmountDown className="text-gray-500" />
              <select
                className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as 'priceLowToHigh' | 'priceHighToLow' | 'alphabetical')
                }
              >
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col gap-4 w-full h-[70vh] items-center justify-center">
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (

            <>
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => {
                    const image = product.images?.[0]?.url || 'https://via.placeholder.com/300';
                    const mrp = product.variants?.[0]?.mrp ?? 0;
                    const price = product.variants?.[0]?.discountedPrice ?? 0;
                    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
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
                          {product.tags?.length && (
                            <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                              {product.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-0.5 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <Link
                            href={slug ? `/collection/${slug}` : '#'}
                            onClick={(e) => {
                              if (!slug) {
                                e.preventDefault();
                                toast.error('Product link not available');
                              }
                            }}
                            className="flex-1 flex flex-col"
                          >
                            <div className="relative w-full h-48">
                              <Image
                                src={image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 25vw"
                              />
                            </div>
                            <div className="p-4 flex flex-col gap-1">
                              <h4 className="text-gray-900 font-semibold text-sm truncate">{product.name}</h4>
                              <p className="text-xs text-gray-500">{product.brand}</p>
                              <div className="flex items-center gap-2">
                                {mrp > price ? (
                                  <>
                                    <span className="line-through text-gray-400 text-sm">₹{mrp}</span>
                                    <span className="text-red-600 font-bold text-base">₹{price}</span>
                                    <span className="text-green-600 text-xs font-bold">({discount}% OFF)</span>
                                  </>
                                ) : (
                                  <span className="text-red-600 font-bold text-base">₹{price}</span>
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
                              className="w-full py-2 rounded-md bg-black text-white hover:bg-orange-500 transition-colors duration-300 text-sm font-semibold"
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

              {!filteredProducts.length && (
                <p className="text-center text-gray-600 mt-10">No products found.</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
