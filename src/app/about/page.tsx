import { FaCheckCircle, FaUsers, FaHeart } from "react-icons/fa";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="bg-[#FFF8DC] py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-[#8B5E3C] mb-4">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          At Craftra, we bring creativity to life through thoughtfully selected art and stationery tools.
          Empowering artists with quality materials, helpful guidance, and a legacy of personal care that transcends time.
          We believe creativity deserves room to grow — and we’re here to support it at every stroke, cut, or splash.
        </p>
      </section>

      {/* Our Journey */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="order-2 md:order-1 flex justify-center">
            <Image
              src="/carousel/aboutus1.jpg"
              alt="Our Journey"
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl w-full max-w-md h-auto object-cover"
            />

          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6 text-[#8B5E3C]">Our Journey</h2>
            <p className="text-gray-700 leading-8 text-md text-justify">
              From humble beginnings in the 1960s in the creative corners of Delhi NCR,
              our physical stores have been a trusted resource for generations of artists, hobbyists, and design professionals.
              <br /><br />
              With six decades of passion and expertise, we’ve proudly been at the heart of every inspired creation.
              <br /><br />
              Now, with our online store, we’re bringing that legacy to your doorstep—anytime, anywhere. Whether you&apos;re a seasoned illustrator or a curious student,
              our shelves are stocked with hand-picked materials upholding the same standard our walk-in customers love.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-[#FFF8DC] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-[#8B5E3C]">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To support every creator with the tools, materials, and knowledge they need to bring their vision to life.
            We know that no two artists are the same, which is why we treat every interaction—online or offline—with care and warmth.
            <br /><br />
            Thank you for letting us be part of your journey for over 60 years. Here’s to continuing it—together—online.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-[#8B5E3C]">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          To nurture creativity in every corner—by empowering artists of all kinds with access to quality materials, guidance,
          and a legacy of care that transcends time. Creativity deserves room to grow—and we’re here to support it every step of the way.
        </p>
      </section>

      {/* Get In Touch / Why Craftra */}
      <section className="bg-[#FFF8DC] py-16 px-6">
        <h2 className="text-3xl font-extrabold text-center text-[#8B5E3C] mb-10">Why Choose Craftra</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaCheckCircle className="mx-auto mb-4 text-[#8B5E3C]" size={48} />
            <h3 className="text-xl font-semibold mb-2">A Curated Collection</h3>
            <p className="text-gray-600">
              Explore an extensive range of art & craft supplies selected with care, creativity, and value in mind.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUsers className="mx-auto mb-4 text-[#8B5E3C]" size={48} />
            <h3 className="text-xl font-semibold mb-2">Personal Touch Meets Convenience</h3>
            <p className="text-gray-600">
              Shop at your pace, 24/7, while enjoying the warmth and attention of our in-store experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHeart className="mx-auto mb-4 text-[#8B5E3C]" size={48} />
            <h3 className="text-xl font-semibold mb-2">Tailored Support</h3>
            <p className="text-gray-600">
              Can’t find what you need? Just reach out—our team will locate it or take a custom order just for you.
            </p>
          </div>
        </div>
      </section>

      {/* Secure Shopping */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#8B5E3C]">Secure Shopping</h2>
        <p className="text-gray-700 text-lg">
          Your trust matters. All transactions are processed through trusted gateways with complete data protection.
          We value your privacy and safeguard your personal information at every step.
        </p>
      </section>
    </div>
  );
}
