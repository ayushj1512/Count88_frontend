'use client';

import { useEffect, useRef, useState, MouseEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import RelatedProducts from '../../components/RelatedProducts';
import Image from 'next/image';
import '../../components/loader2.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// ---------- Types ----------
interface Variant {
  size: string;
}
interface ImageType {
  url: string;
  public_id?: string;
}
interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  brand: string;
  category: string;
  subcategory?: string;
  gender: string;
  price: number;
  discountPrice?: number;
  variants: Variant[];
  images: ImageType[];
  tags?: string[];
}
interface TransformedProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  brand: string;
  category: string;
  mrp: number;
  discountedPrice: number;
  variants: { variant: string }[];
  images: ImageType[];
  tags?: string[];
}
interface TransformedProductCard {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp: number;
  images: string[];
  category: string;
}

// ---------- Component ----------
export default function ProductFromCollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<TransformedProduct | null>(null);
  const [allProducts, setAllProducts] = useState<TransformedProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{ variant: string } | null>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensData, setLensData] = useState({ left: 0, top: 0, bgX: 0, bgY: 0 });

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const lensSize = 250;
  const zoom = 2.5;

  const addToCart = useCartStore((state) => state.addToCart);
  const clearCart = useCartStore((state) => state.clearCart);

  // ---------- Fetch Data ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/slug/${slug}`);
        const all = await fetch(`${API_BASE}/api/products`);
        if (!res.ok || !all.ok) throw new Error('Failed to fetch');

        const productData: Product = await res.json();
        const allData: Product[] = await all.json();

        const transformedProduct: TransformedProduct = {
          ...productData,
          variants: productData.variants?.map((v) => ({ variant: v.size })) || [],
          mrp: productData.price,
          discountedPrice: productData.discountPrice ?? productData.price,
          images: productData.images,
        };

        const transformedProducts: TransformedProductCard[] = allData.map((p, index) => ({
          id: index,
          slug: p.slug,
          title: p.name,
          price: p.discountPrice ?? p.price,
          mrp: p.price,
          images: p.images?.map((img) => img.url) || [],
          category: p.category,
        }));

        setProduct(transformedProduct);
        setAllProducts(transformedProducts);
        setActiveImage(productData.images?.[0]?.url || '');
        setSelectedVariant(null); // force user to pick size
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  // ---------- Lens Handler ----------
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
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

  // ---------- Helpers ----------
  const parseDescription = (desc?: string): string[] =>
    typeof desc === 'string'
      ? desc
          .split('.')
          .map((d) => d.trim())
          .filter((d) => d.length > 3)
      : [];

  // ---------- Loading & Error ----------
  if (loading)
    return (
      <div className="flex flex-col gap-4 w-full h-[70vh] items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-[#7a0d2e] text-4xl animate-spin flex items-center justify-center border-t-[#7a0d2e] rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-[#7a0d2e] text-2xl animate-spin flex items-center justify-center border-t-[#7a0d2e]/70 rounded-full"></div>
        </div>
      </div>
    );

  if (!product) return <div className="p-10 text-center text-red-600">Product not found</div>;

  const { _id, name, brand, category, description, images, variants, mrp, discountedPrice, tags } =
    product;

  const discount = mrp > discountedPrice ? Math.round(((mrp - discountedPrice) / mrp) * 100) : 0;
  const descriptionPoints = parseDescription(description);

  // ---------- JSX ----------
  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image + Zoom */}
        <div>
          <div
            ref={imageContainerRef}
            className="relative border rounded-xl overflow-hidden bg-white shadow-md w-full h-[350px] sm:h-[450px] md:h-[500px]"
            onMouseEnter={() => window.innerWidth >= 768 && setLensVisible(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setLensVisible(false)}
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

            {/* Zoom Lens (square now) */}
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
                borderRadius: '0px',
                display: lensVisible ? 'block' : 'none',
              }}
            />

            {/* Discount */}
            <span className="absolute top-3 left-3 bg-[#7a0d2e] text-white text-xs font-bold px-2 py-1 rounded shadow">
              {discount > 0 ? `${discount}% OFF` : 'Best Price'}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 flex-wrap justify-center sm:justify-start">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`Thumb ${idx + 1}`}
                width={80}
                height={80}
                className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md border cursor-pointer transition ${
                  activeImage === img.url
                    ? 'ring-2 ring-[#7a0d2e]'
                    : 'hover:ring-2 hover:ring-[#7a0d2e]/60'
                }`}
                onClick={() => setActiveImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xl sm:text-2xl font-semibold text-[#7a0d2e]">
              ₹{discountedPrice}
            </span>
            {mrp !== discountedPrice && (
              <>
                <span className="line-through text-gray-500 text-base sm:text-lg">₹{mrp}</span>
                <span className="text-sm font-medium text-green-600">({discount}% OFF)</span>
              </>
            )}
          </div>

          {/* Size Selector */}
          {variants.length > 0 && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">Choose Size:</label>
              <div className="flex gap-2 flex-wrap">
                {variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                      selectedVariant?.variant === v.variant
                        ? 'bg-[#7a0d2e] text-white border-[#7a0d2e]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#7a0d2e] hover:text-[#7a0d2e]'
                    }`}
                  >
                    {v.variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand & Category */}
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong className="text-gray-800">Brand:</strong> {brand}
            </p>
            <p>
              <strong className="text-gray-800">Category:</strong> {category}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-[#7a0d2e] text-[#7a0d2e] text-xs font-semibold px-2 py-1 rounded-full uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => {
                if (!selectedVariant) {
                  toast.error('Please select a size before adding to cart');
                  return;
                }
                addToCart({
                  id: _id,
                  title: name,
                  image: activeImage ?? '',
                  price: discountedPrice,
                  size: selectedVariant.variant,
                });
                toast.success(`${name} (${selectedVariant.variant}) added to cart`);
              }}
              className="bg-[#7a0d2e] text-white px-6 py-3 rounded-md font-medium shadow hover:scale-[1.02] transition w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (!selectedVariant) {
                  toast.error('Please select a size before buying');
                  return;
                }
                clearCart();
                addToCart({
                  id: _id,
                  title: name,
                  image: activeImage ?? '',
                  price: discountedPrice,
                  size: selectedVariant.variant,
                });
                router.push('/checkout');
              }}
              className="bg-white border border-[#7a0d2e] text-[#7a0d2e] px-6 py-3 rounded-md font-medium hover:bg-[#7a0d2e]/10 transition w-full sm:w-auto"
            >
              Buy Now
            </button>
          </div>

          {/* Description as bullet points */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-2">Description:</h2>
            {descriptionPoints.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {descriptionPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No description available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        currentSlug={product.slug}
        category={product.category}
        allProducts={allProducts}
      />
    </div>
  );
}
