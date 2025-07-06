'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import RelatedProducts from '../../components/RelatedProducts';
import Image from 'next/image';

interface Product {
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
}

interface RelatedProductType {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp: number;
  images: string[];
  category: string;
}

interface RawProduct {
  _id: string;
  name: string;
  slug: string;
  variants: { mrp: number; discountedPrice: number }[];
  images: { url: string }[];
  category: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function ProductFromCollectionPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<RelatedProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Product['variants'][0] | null>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensData, setLensData] = useState({ left: 0, top: 0, bgX: 0, bgY: 0 });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lensSize = 250;
  const zoom = 2.5;

  const addToCart = useCartStore((state) => state.addToCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/slug/${slug}`);
        const all = await fetch(`${API_BASE}/products`);
        if (!res.ok || !all.ok) throw new Error('Failed to fetch');

        const productData: Product = await res.json();
        const allData: RawProduct[] = await all.json();

        const transformedProducts: RelatedProductType[] = allData.map((p, index) => ({
          id: index,
          slug: p.slug,
          title: p.name,
          price: p.variants?.[0]?.discountedPrice || 0,
          mrp: p.variants?.[0]?.mrp || 0,
          images: p.images?.map((img) => img.url) || [],
          category: p.category,
        }));

        setProduct(productData);
        setAllProducts(transformedProducts);
        setActiveImage(productData.images?.[0]?.url || '');
        setSelectedVariant(productData.variants?.[0] || null);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
    const offsetY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setLensData({ left: offsetX, top: offsetY, bgX, bgY });
  };

  if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-600">Product not found</div>;

  const { _id, name, brand, category, description, images, variants } = product;
  const mrp = selectedVariant?.mrp ?? 0;
  const discountedPrice = selectedVariant?.discountedPrice ?? 0;
  const discount = mrp > discountedPrice ? Math.round(((mrp - discountedPrice) / mrp) * 100) : 0;

  const parseDescription = (desc: string): string[] =>
    desc
      .split(/\n|\.|\u2022|\-/)
      .map((d) => d.trim())
      .filter((d) => d.length > 3);

  const featurePoints = typeof description === 'string' ? parseDescription(description) : (description ?? []);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        <div>
          <div
            ref={imageContainerRef}
            className="relative border rounded-xl overflow-hidden bg-white shadow-sm w-full h-[400px] sm:h-[500px]"
            onMouseEnter={() => setLensVisible(true)}
            onMouseLeave={() => setLensVisible(false)}
            onMouseMove={handleMouseMove}
          >
            {activeImage && (
              <Image
                src={activeImage}
                alt={name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            )}

            {lensVisible && (
              <div
                className="absolute z-50 border border-gray-300 pointer-events-none hidden md:block"
                style={{
                  width: `${lensSize}px`,
                  height: `${lensSize}px`,
                  left: `${lensData.left}px`,
                  top: `${lensData.top}px`,
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${zoom * 100}%`,
                  backgroundPosition: `${lensData.bgX}% ${lensData.bgY}%`,
                  borderRadius: '50%',
                }}
              />
            )}

            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-4 flex-wrap justify-center sm:justify-start">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`Thumb ${idx + 1}`}
                width={80}
                height={80}
                className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md border cursor-pointer transition ${activeImage === img.url
                  ? 'ring-2 ring-red-500'
                  : 'hover:ring-2 hover:ring-yellow-500'
                  }`}
                onClick={() => setActiveImage(img.url)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{name}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xl sm:text-2xl font-semibold text-red-600">₹{discountedPrice}</span>
            {discount > 0 && (
              <>
                <span className="line-through text-gray-500 text-base sm:text-lg">₹{mrp}</span>
                <span className="text-sm font-medium text-green-600">({discount}% OFF)</span>
              </>
            )}
          </div>

          {variants.length > 1 && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Choose Variant:</label>
              <select
                className="border px-3 py-2 rounded-md w-full sm:w-60"
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

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => {
                addToCart({ id: _id, title: name, image: activeImage ?? '', price: discountedPrice });
                toast.success(`${name} added to cart`);
              }}
              className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                clearCart();
                addToCart({ id: _id, title: name, image: activeImage ?? '', price: discountedPrice });
                router.push('/checkout');
              }}
              className="bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-600 transition w-full sm:w-auto"
            >
              Buy Now
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2 mt-2">Features:</h2>
            {featurePoints.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {featurePoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No description available.</p>
            )}
          </div>
        </div>
      </div>

      <RelatedProducts
        currentSlug={product.slug}
        category={product.category}
        allProducts={allProducts}
      />
    </div>
  );
}
