"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ApiProduct {
  slug: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: { url: string }[];
  groupId?: string;
}

interface GroupedProductCard {
  id: number;
  slug: string;
  title: string;
  price: number;
  images: string[];
  groupId?: string;
}

interface GroupedProductsProps {
  currentSlug: string;
  groupId?: string;
  apiBase: string;
}

export default function GroupedProducts({
  currentSlug,
  groupId,
  apiBase,
}: GroupedProductsProps) {
  const [products, setProducts] = useState<GroupedProductCard[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupProducts = async () => {
      if (!groupId) return;

      try {
        const res = await fetch(`${apiBase}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ApiProduct[] = await res.json();

        const grouped: GroupedProductCard[] = data
          .filter((p) => p.groupId === groupId && p.slug !== currentSlug)
          .map((p, index) => ({
            id: index,
            slug: p.slug,
            title: p.name,
            price: p.discountPrice ?? p.price,
            images: p.images?.map((img) => img.url) || [],
            groupId: p.groupId,
          }));

        setProducts(grouped);
      } catch (err) {
        console.error("GroupedProducts fetch error:", err);
      }
    };

    fetchGroupProducts();
  }, [groupId, currentSlug, apiBase]);

  if (products.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center"
            onClick={() => router.push(`/collection/${p.slug}`)}
          >
            {/* Square Image */}
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              {p.images[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md transition-transform hover:scale-105"
                />
              )}
            </div>

            {/* Product title */}
            <div className="mt-1 text-center text-xs sm:text-sm font-medium text-gray-800 truncate w-full px-1">
              {p.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
