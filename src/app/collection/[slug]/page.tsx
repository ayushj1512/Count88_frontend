'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

type Product = {
  _id: string;
  groupId: string;
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

export default function ProductFromCollectionPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Product['variants'][0] | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/slug/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.images?.[0]?.url || '');
        setSelectedVariant(data.variants?.[0] || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-600">Product not found.</div>;

  const { _id, name, brand, category, description, images, variants } = product;
  const mrp = selectedVariant?.mrp ?? 0;
  const discountedPrice = selectedVariant?.discountedPrice ?? 0;
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
                className={`h-20 w-20 object-cover rounded-md border cursor-pointer hover:ring-2 ring-red-500 transition ${activeImage === img.url ? 'ring-2 ring-red-500' : ''
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
            <span className="text-2xl font-semibold text-red-600">₹{discountedPrice}</span>
            <span className="line-through text-gray-500">₹{mrp}</span>
            <span className="text-sm font-medium text-green-600">({discount}% OFF)</span>
          </div>

          {variants.length > 1 && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Choose Variant:</label>
              <select
                className="border px-3 py-2 rounded-md"
                value={selectedVariant?.variant}
                onChange={(e) =>
                  setSelectedVariant(
                    variants.find((v) => v.variant === e.target.value) || variants[0]
                  )
                }
              >
                {variants.map((v, idx) => (
                  <option key={idx} value={v.variant}>
                    {v.variant}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-gray-700">Brand:</strong> {brand}</p>
            <p><strong className="text-gray-700">Category:</strong> {category}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Features:</h2>
            {typeof description === 'string' ? (
              <p className="text-gray-600">{description}</p>
            ) : (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {(description ?? []).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => {
              addToCart({
                id: _id, // 🔁 Ensure this matches backend productId
                title: name,
                image: activeImage ?? '',
                price: discountedPrice,
              });
              toast.success(`${name} added to cart`);
            }}
            className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
