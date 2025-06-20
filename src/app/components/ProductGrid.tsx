const products = [
  { name: 'Sunset Dreams', price: '₹899', image: '/art1.jpg' },
  { name: 'Ocean Whisper', price: '₹999', image: '/art2.jpg' },
  { name: 'Minimal Bloom', price: '₹799', image: '/art3.jpg' },
];

export default function ProductGrid() {
  return (
    <section id="shop" className="py-16 px-8 bg-white text-gray-700">
      <h3 className="text-2xl font-semibold mb-8 text-center text-brown-800">Our Collection</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <div key={index} className="bg-purple-100 p-4 rounded-xl shadow hover:scale-105 transition">
            <img src={product.image} alt={product.name} className="rounded-md w-full h-60 object-cover" />
            <h4 className="mt-4 text-lg font-medium text-brown-800">{product.name}</h4>
            <p className="text-sm text-brown-600">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
