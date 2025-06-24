'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

export default function ProductFromCollectionPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const encodedData = searchParams.get('data');
    if (!encodedData) {
      console.error('No product data found in query params.');
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(encodedData)) as Product;
      setProduct(parsed);
      setActiveImage(parsed.images?.[0]?.url || '');
    } catch (err) {
      console.error('Error parsing product data:', err);
    }
  }, [searchParams]);

  if (!product) {
    return <div className="p-10 text-center text-red-600">Product not found.</div>;
  }

  const { name, brand, category, description, images, variants } = product;
  const { mrp, discountedPrice } = variants?.[0] || {};
  const discount = mrp ? Math.round(((mrp - discountedPrice) / mrp) * 100) : 0;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div>
          <div className="border rounded-xl overflow-hidden relative bg-white">
            <img
              src={activeImage || ''}
              alt={name}
              className="w-full h-[450px] object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                className={`h-20 w-20 object-cover rounded-md border cursor-pointer hover:ring-2 ring-pink-500 transition ${activeImage === img.url ? 'ring-2 ring-pink-500' : ''
                  }`}
                onClick={() => setActiveImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-pink-600">₹{discountedPrice}</span>
            <span className="line-through text-gray-500">₹{mrp}</span>
            <span className="text-sm font-medium text-green-600">({discount}% OFF)</span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-gray-700">Brand:</strong> {brand}</p>
            <p><strong className="text-gray-700">Category:</strong> {category}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Features:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {(Array.isArray(description) ? description : [description || '']).map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
