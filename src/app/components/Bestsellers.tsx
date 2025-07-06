'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

type Product = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  description?: string | string[];
  tags?: string[];
  images: { url: string }[];
  variants: {
    variant: string;
    mrp: number;
    discountedPrice: number;
  }[];
  isActive: boolean;
};

export default function BestsellerSection() {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isCartOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const fetchBestsellers = useCallback(async () => {
    try {
      const res = await fetch('https://craftra-backend.onrender.com/api/products');
      const data: Product[] = await res.json();
      const filtered = data.filter((product) => product.tags?.includes('bestseller'));
      setBestsellers(filtered);
    } catch (err) {
      console.error('Failed to fetch bestsellers', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestsellers();
  }, [fetchBestsellers]);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .product-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .product-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>

      <section className="py-12 bg-[#F7CFD8] relative z-10 w-full overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
          B E S T S E L L E R
        </h2>

        {/* Arrows */}
        <div className="relative">
          <button
            onClick={() => scrollBy(-300)}
            className="hidden md:flex items-center justify-center absolute left-0 top-[40%] z-20 w-10 h-10 bg-white border rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={() => scrollBy(300)}
            className="hidden md:flex items-center justify-center absolute right-0 top-[40%] z-20 w-10 h-10 bg-white border rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Horizontal Scroll Wrapper */}
          <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar">
            <div
              ref={scrollRef}
              className="flex gap-4 px-4 sm:px-6 scroll-smooth snap-x snap-mandatory touch-pan-x h-[370px]"
              style={{ minWidth: '100%' }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-[250px] h-[350px] bg-white rounded-xl shadow animate-pulse flex-shrink-0 snap-start"
                  />
                ))
                : bestsellers.map((product) => (
                  <div
                    key={product._id}
                    className="w-[250px] flex-shrink-0 snap-start product-hover"
                  >
                    <ProductCard
                      product={product}
                      onClick={() => router.push(`/collection/${product.slug}`)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <button
            onClick={() => router.push('/bestsellers')}
            className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            View All
          </button>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black bg-opacity-50 flex justify-end"
          onClick={() => toggleCart(false)}
        >
          <div
            className="w-full sm:w-[400px] bg-white h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CartDrawer isOpen={isCartOpen} onClose={() => toggleCart(false)} />
          </div>
        </div>
      )}

      {/* Decorative SVG */}
      <div className="-mt-12 overflow-hidden leading-none rotate-180 bg-[#EBFFD9]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
          <path
            d="M0,0 C100,50 150,-30 300,30 C450,90 550,-20 700,40 C850,100 1000,-10 1200,50 L1200,120 L0,120 Z"
            fill="#F7CFD8"
          />
        </svg>
      </div>
    </>
  );
}
