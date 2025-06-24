'use client';

import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

type Product = {
  _id: string;
  groupId: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  description?: string[];
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
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <main className="flex-1">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-gray-700 text-sm">
              {filteredProducts.length} of {products.length} products
            </p>

            <div className="flex items-center gap-2 text-sm">
              <FaSortAmountDown className="text-gray-500" />
              <select
                className="border px-3 py-1 rounded-md"
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

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const image = product.images?.[0]?.url || 'https://via.placeholder.com/300';
                const mrp = product.variants?.[0]?.mrp ?? 0;
                const price = product.variants?.[0]?.discountedPrice ?? 0;
                const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 flex flex-col h-full">
                      {(product.tags?.length ?? 0) > 0 && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                          {(product.tags ?? []).map((tag) => (
                            <span
                              key={tag}
                              className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}


                      <Link href={`/collection/${product.slug}`} className="flex-1 flex flex-col">
                        <img
                          src={image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md mb-3"
                        />
                        <h4 className="text-gray-800 font-medium text-sm mb-1 line-clamp-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 line-through text-sm">₹{mrp}</p>
                          <p className="font-semibold text-lg text-pink-600">₹{price}</p>
                          {discount > 0 && (
                            <span className="text-green-600 text-xs font-semibold">({discount}% OFF)</span>
                          )}
                        </div>
                      </Link>

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
                        className="mt-4 bg-[#FFF2E1] font-bold text-black py-2 rounded hover:bg-black transition hover:text-[#FFF2E1] text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {!filteredProducts.length && (
            <p className="text-center text-gray-600 mt-10">No products found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
