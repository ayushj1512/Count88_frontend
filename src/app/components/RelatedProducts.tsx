'use client';

import Link from 'next/link';

type Product = {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp: number;
  images: string[];
  category: string;
};

type Props = {
  currentSlug: string;
  category: string;
  allProducts: Product[];
};

export default function RelatedProducts({ currentSlug, category, allProducts }: Props) {
  const related = allProducts.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Related Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((product) => {
          const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

          return (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <div className="bg-white border rounded-lg p-4 hover:shadow transition cursor-pointer">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h4 className="text-gray-800 font-medium text-sm mb-1 line-clamp-1">
                  {product.title}
                </h4>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-pink-600">₹{product.price}</span>{' '}
                  <span className="line-through text-gray-400">₹{product.mrp}</span>{' '}
                  <span className="text-green-600 font-medium">({discount}% OFF)</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
