import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheckCircle, FaUsers, FaHeart } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-purple-100 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          At Craftra, we bring creativity to life through thoughtfully selected art and stationery tools to nurture creativity in every corner. Empowering artists of all kinds with access to quality materials, helpful guidance, and a legacy of personal care that transcends time and space. We believe that creativity deserves room to grow—and we're here to support it at every stroke, cut, or splash.
        </p>
      </section>

      {/* Our Journey */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="/carousel/aboutus1.jpg"
              alt="Our Journey"
              className="rounded-2xl shadow-xl w-full max-w-sm h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Journey</h2>
            <p className="text-gray-700 leading-8 text-md pr-14 text-justify">
              From humble beginnings in the 1960s, nestled in the creative corners of Delhi NCR, our physical stores have been a trusted resource for generations of artists, hobbyists, educators, and design professionals.
              <br /><br />
              With six decades of passion and expertise in fine art, craft materials, graphic supplies, instructional books, and more, we’ve proudly been at the heart of every inspired creation.
              <br /><br />
              Now, with the launch of our online store, we’re bringing that legacy directly to your doorstep—anytime, anywhere. Whether you're a seasoned illustrator, a curious student, or simply someone rediscovering the joy of making, our digital shelves are stocked with hand-picked materials that uphold the same standard of quality and variety our walk-in customers have always loved.
            </p>
          </div>

        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-purple-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our mission has always been simple: support every creator with the tools, materials, and knowledge they need to bring their vision to life. We know that no two artists are the same, which is why we treat every interaction—online or off—with care and responsiveness.
            <br /><br />
            Thank you for making us part of your creative journey for over 60 years. Here’s to continuing it—together—online.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          To nurture creativity in every corner—by empowering artists of all kinds with access to quality materials, helpful guidance, and a legacy of personal care that transcends time and space. We believe that creativity deserves room to grow—and we're here to support it at every stroke, cut, or splash.
        </p>
      </section>

      {/* Get In Touch / Why Craftra */}
      <section className="bg-purple-100 py-16 px-6  mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10">Get In Touch</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <FaCheckCircle className="mx-auto mb-4 text-purple-300" size={48} />
            <h3 className="text-xl font-bold mb-2">A Curated Collection</h3>
            <p className="text-gray-600">
              Explore an extensive range of art & craft supplies selected with care, creativity, and value in mind.
            </p>
          </div>
          <div>
            <FaUsers className="mx-auto mb-4 text-purple-300" size={48} />
            <h3 className="text-xl font-bold mb-2">Convenience Meets Personal Touch</h3>
            <p className="text-gray-600">
              Place orders at your own pace, 24/7, while still enjoying the warmth and attention that defines our in-store experience.
            </p>
          </div>
          <div>
            <FaHeart className="mx-auto mb-4 text-purple-300" size={48} />
            <h3 className="text-xl font-bold mb-2">Tailored Support</h3>
            <p className="text-gray-600">
              Can’t find a product online? Just reach out—our team will help locate it or take a custom order for you.
            </p>
          </div>
        </div>
      </section>

      {/* Secure Shopping Info */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Secure Shopping</h2>
        <p className="text-gray-700 text-lg">
          Your trust matters. Transactions are handled via trusted gateways with full data protection, and your personal information stays strictly with us.
        </p>
      </section>

    </div>
  );
}
