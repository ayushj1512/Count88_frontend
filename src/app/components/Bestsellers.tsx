"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard";

export default function BestsellerSection() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isCartOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const fetchBestsellers = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/bestsellers?page=${page}`);
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setBestsellers((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch bestsellers", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchBestsellers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchBestsellers();
        }
      },
      {
        root: scrollRef.current,
        threshold: 1.0,
      }
    );
    const target = loadMoreRef.current;
    if (target && scrollRef.current) {
      observer.observe(target);
    }
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchBestsellers]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const newScroll =
      direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  return (
    <>
      <style>
        {`
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          @keyframes slideUp {
            0% { transform: translateY(100%); }
            100% { transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>

      <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F7CFD8] relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
          B E S T S E L L E R
        </h2>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute z-10 left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full hover:bg-gray-100"
          >
            &#8249;
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar space-x-4 px-2 sm:px-6 snap-x snap-mandatory scroll-smooth"
          >
            {bestsellers.map((item, idx) => (
              <ProductCard
                key={idx}
                product={item}
                onClick={() => setSelectedProduct(item)}
              />
            ))}
            <div ref={loadMoreRef} className="w-1 h-1" />
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute z-10 right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 sm:p-3 rounded-full hover:bg-gray-100"
          >
            &#8250;
          </button>

          <div className="mt-10 sm:mt-14 flex justify-center">
            <button
              onClick={() => router.push("/bestsellers")}
              className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[90%] md:max-w-2xl rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {selectedProduct.title}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-2xl sm:text-3xl text-gray-500 hover:text-black transition"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-52 sm:h-64 object-cover rounded-xl shadow"
              />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-xl font-semibold text-pink-600">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.regular && (
                    <span className="text-gray-400 line-through">
                      ₹{selectedProduct.regular}
                    </span>
                  )}
                </div>

                {selectedProduct.colors?.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">Colors:</span>
                    {selectedProduct.colors.map((color: string, idx: number) => (
                      <span
                        key={idx}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border"
                        style={{
                          backgroundColor: color === "transparent" ? "#ccc" : color,
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="text-md font-semibold text-gray-700 mb-1">
                    Description
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedProduct.description || "No description available."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    useCartStore.getState().addToCart(selectedProduct);
                    useCartStore.getState().toggleCart(true);
                    setSelectedProduct(null);
                  }}
                  className="w-full mt-4 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="-mt-12 overflow-hidden leading-none rotate-180 bg-[#EBFFD9]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
        >
          <path
            d="M0,0 C100,50 150,-30 300,30 C450,90 550,-20 700,40 C850,100 1000,-10 1200,50 L1200,120 L0,120 Z"
            fill="#F7CFD8"
          />
        </svg>
      </div>
    </>
  );
}
