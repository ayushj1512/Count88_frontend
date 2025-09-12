"use client";

import { FaCheckCircle, FaUsers, FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="bg-[url('https://i.pinimg.com/736x/d9/18/eb/d918eb1c6399cc38440a290b959d51e8.jpg')] bg-cover bg-center py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">ABOUT US</h1>
          <p className="text-md sm:text-lg text-white leading-relaxed mb-4">
            We are a footwear brand with a vision to transform the way the world sees fashion—without compromise. Since stepping
            into manufacturing in 2010, we have been committed to creating shoes that combine style, comfort, and responsibility.
          </p>
          <p className="text-md sm:text-lg text-white leading-relaxed">
            As a <span className="font-semibold">100% vegan and cruelty-free</span> brand, we believe fashion should never come at the
            expense of animals or the planet. Every pair we design is crafted with sustainable materials, innovative techniques,
            and premium craftsmanship to ensure lasting quality and comfort.
          </p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="https://i.pinimg.com/1200x/e2/df/d2/e2dfd23e3231c9666e2b2f855d5037e4.jpg"
              alt="Our Journey"
              width={560}
              height={420}
              className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#7a0d2e]">OUR JOURNEY</h2>
            <p className="text-gray-700 leading-7 sm:leading-8 text-md sm:text-lg text-justify">
              Our journey is driven by purpose: to prove that stylish footwear can be ethical, eco-conscious, and accessible.
              Since 2010, we have continuously refined our processes, partnered with responsible suppliers, and innovated
              material alternatives so that every step taken in our shoes leaves a smaller footprint and a better story.
              <br /><br />
              With each collection, we strive to inspire a future where fashion is kind—to people, animals, and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-[url('https://i.pinimg.com/736x/7c/28/17/7c28173bcbf8f6b526c8b773004b5fff.jpg')] bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center bg-white/90 p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#7a0d2e]">OUR PHILOSOPHY</h2>
          <p className="text-gray-700 text-md sm:text-lg leading-relaxed">
            At the heart of our brand lies a simple promise: to deliver premium-quality footwear made with natural, ethical, and
            eco-conscious materials. By choosing us, you’re choosing a lifestyle that celebrates design, comfort, and compassion—without compromise.
          </p>
        </div>
      </section>

      {/* Sourcing & Materials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <Image
              src="https://i.pinimg.com/1200x/c8/8e/bf/c88ebf549743f755b5254671e881cd49.jpg"
              alt="Sourcing and Materials"
              width={560}
              height={420}
              className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#7a0d2e]">SOURCING & MATERIALS</h2>
            <p className="text-gray-700 leading-7 sm:leading-8 text-md sm:text-lg text-justify">
              We source only the best natural and cruelty-free alternatives to leather and synthetic materials. From plant-based fibers
              to eco-friendly textiles, every raw material is carefully selected for its durability, comfort, and environmental impact.
              Our sustainable sourcing ensures that each creation is as kind to the earth as it is to your feet.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Quality */}
      <section className="bg-[url('https://i.pinimg.com/1200x/dd/2d/84/dd2d84c0d840a5ceeb6529a1b362dd0b.jpg')] bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center  p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#7a0d2e]">CRAFTSMANSHIP AND QUALITY</h2>
          <p className="text-black leading-relaxed text-md sm:text-lg">
            Quality is not negotiable. Combining cutting-edge technology with timeless craftsmanship, we design collections that are elegant,
            durable, and luxuriously comfortable. Each shoe undergoes rigorous quality checks to ensure it is built to last, while remaining
            lightweight and breathable.
          </p>
        </div>
      </section>

      {/* Our Collection */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
          {/* Left: Text Content with BG */}
          <div className="bg-[url('https://i.pinimg.com/736x/c4/38/e0/c438e0b0599ec9d2e4fc64b7edbfb9ca.jpg')] bg-cover bg-center rounded-2xl shadow-2xl flex flex-col justify-center p-8 h-96 sm:h-[28rem]">
            <div className="bg-white/70 p-6 rounded-lg">
              <h2 className="text-3xl font-extrabold mb-4 text-[#7a0d2e]">Our Collection</h2>
              <p className="text-gray-700 mb-4">
                Our footwear is designed for everyday wear—balancing modern style and conscious living. 
                Every collection embodies our brand values:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-md sm:text-lg">
                <li><span className="font-semibold">100% Vegan and Cruelty-Free</span> — no animal-derived materials used.</li>
                <li><span className="font-semibold">Premium, Sustainable Materials</span> — thoughtfully selected for longevity and comfort.</li>
                <li><span className="font-semibold">Timeless Aesthetics with Modern Comfort</span> — pieces that pair with many wardrobes.</li>
                <li><span className="font-semibold">Responsible Manufacturing Practices</span> — transparency and care throughout production.</li>
              </ul>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <Image
              src="https://i.pinimg.com/736x/83/0b/ff/830bffcda08e32214b565f9e984ea173.jpg"
              alt="Our Collection"
              width={560}
              height={448}
              className="rounded-2xl shadow-2xl w-full h-96 sm:h-[28rem] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Secure Shopping */}
      <section
        className="max-w-6xl mx-auto bg-[url('https://i.pinimg.com/736x/c4/ba/94/c4ba944f701f8b08f357b02570eb2c54.jpg')] bg-cover bg-center flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center w-full max-w-3xl  p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#8B5E3C]">OUR MISSION</h2>
          <p className="text-black text-md sm:text-lg leading-relaxed">
            We aim to inspire conscious choices by proving that sustainability and luxury can walk hand in hand. 
            Our mission goes beyond creating footwear — it is about building a future where fashion respects people, 
            animals, and the planet. Alongside our commitment to sustainable practices, we prioritize your trust and 
            safety. Every purchase is supported by secure transactions, trusted gateways, and complete data protection, 
            ensuring that your personal information is safeguarded at every step.
          </p>
        </div>
      </section>

    </div>
  );
}
