import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheckCircle, FaUsers, FaHeart } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">


      {/* Hero Section */}
      <section className="bg-blue-100 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Craftra</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          At Craftra, we bring creativity to life through thoughtfully selected art and stationery tools. Whether you're a doodler, journaler, or a full-time maker — we’re here to color your world.
        </p>
      </section>

      {/* Our Story */}
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
            <p className="text-gray-700 leading-8 text-md pr-14  text-justify">
              Since the 1960s, we have built a strong reputation and loyal customer base through decades of excellence. Specializing in a wide range of office and school supplies—from pens and notebooks to folders and paper—we’ve grown alongside your needs.
              <br /><br />
              With over 60 years of experience, we’ve cultivated strong supplier partnerships and an in-depth understanding of the stationery industry. Our commitment to top-tier customer service has made us a trusted source for everyday essentials.
              <br /><br />
              We collaborate with local and global creators to curate stationery and art tools that are not only functional but also spark creativity. From minimalist planners to playful washi tapes—everything we offer is designed to uplift your daily creative flow.
            </p>
          </div>


        </div>
      </section>


      {/* Our Mission */}
      <section className="bg-blue-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            We believe creativity lives in everyone. Our mission is to make the journey of creating joyful and accessible — whether it’s through premium tools, personalized recommendations, or an uplifting community.
          </p>
        </div>
      </section>

      {/* Why Craftra */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10">Why Choose Craftra?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <FaCheckCircle className="mx-auto mb-4 text-blue-200" size={48} />
            <h3 className="text-xl font-bold mb-2">Curated Quality</h3>
            <p className="text-gray-600">
              Every item is handpicked to ensure quality, utility, and design excellence.
            </p>
          </div>
          <div>
            <FaUsers className="mx-auto mb-4 text-blue-200" size={48} />
            <h3 className="text-xl font-bold mb-2">Creative Community</h3>
            <p className="text-gray-600">
              We’re more than a store — we’re a space where creators connect, learn, and grow.
            </p>
          </div>
          <div>
            <FaHeart className="mx-auto mb-4 text-blue-200" size={48} />
            <h3 className="text-xl font-bold mb-2">Made With Love</h3>
            <p className="text-gray-600">
              Every detail matters. We design and deliver with care, passion, and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Craftra Family</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover tools that inspire, products that last, and a community that celebrates you. Let’s craft something beautiful — together.
        </p>
      </section>


    </div>
  );
}
