"use client";

import { motion } from "framer-motion";
import { Check, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#7a0d2e] py-20 px-4 text-center text-white"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold"
          >
            ABOUT US
          </motion.h1>
          <p className="text-md sm:text-lg leading-relaxed">
            We are a footwear brand with a vision to transform the way the world sees fashion—without compromise. Since stepping
            into manufacturing in 2010, we have been committed to creating shoes that combine style, comfort, and responsibility.
          </p>
          <p className="text-md sm:text-lg leading-relaxed">
            As a <span className="font-semibold">100% vegan and cruelty-free</span> brand, we believe fashion should never come at the
            expense of animals or the planet. Every pair we design is crafted with sustainable materials, innovative techniques,
            and premium craftsmanship to ensure lasting quality and comfort.
          </p>
        </div>
      </motion.section>

      {/* Our Journey */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7e6ea]"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#7a0d2e] flex items-center gap-3">
            <Users className="w-6 h-6 text-[#7a0d2e]" /> OUR JOURNEY
          </h2>
          <p className="text-gray-800 leading-7 sm:leading-8 text-md sm:text-lg text-justify">
            Our journey is driven by purpose: to prove that stylish footwear can be ethical, eco-conscious, and accessible.
            Since 2010, we have continuously refined our processes, partnered with responsible suppliers, and innovated
            material alternatives so that every step taken in our shoes leaves a smaller footprint and a better story.
            <br /><br />
            With each collection, we strive to inspire a future where fashion is kind—to people, animals, and the environment.
          </p>
        </div>
      </motion.section>

      {/* Our Philosophy */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-5xl mx-auto text-center p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#7a0d2e] flex justify-center items-center gap-2">
            <Check className="w-6 h-6 text-[#7a0d2e]" /> OUR PHILOSOPHY
          </h2>
          <p className="text-gray-700 text-md sm:text-lg leading-relaxed">
            At the heart of our brand lies a simple promise: to deliver premium-quality footwear made with natural, ethical, and
            eco-conscious materials. By choosing us, you’re choosing a lifestyle that celebrates design, comfort, and compassion—without compromise.
          </p>
        </div>
      </motion.section>

      {/* Sourcing & Materials */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7e6ea]"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#7a0d2e] flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#7a0d2e]" /> SOURCING & MATERIALS
          </h2>
          <p className="text-gray-800 leading-7 sm:leading-8 text-md sm:text-lg text-justify">
            We source only the best natural and cruelty-free alternatives to leather and synthetic materials. From plant-based fibers
            to eco-friendly textiles, every raw material is carefully selected for its durability, comfort, and environmental impact.
            Our sustainable sourcing ensures that each creation is as kind to the earth as it is to your feet.
          </p>
          <p className="text-gray-800 leading-7 sm:leading-8 text-md sm:text-lg text-justify">
            Our partnerships with local and global suppliers reflect our commitment to ethical production. Every step of the supply chain is monitored to maintain transparency and uphold environmental standards.
          </p>
        </div>
      </motion.section>

      {/* Craftsmanship & Quality */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-5xl mx-auto text-center p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#7a0d2e]">CRAFTSMANSHIP AND QUALITY</h2>
          <p className="text-gray-800 leading-relaxed text-md sm:text-lg">
            Quality is not negotiable. Combining cutting-edge technology with timeless craftsmanship, we design collections that are elegant,
            durable, and luxuriously comfortable. Each shoe undergoes rigorous quality checks to ensure it is built to last, while remaining
            lightweight and breathable.
          </p>
          <p className="text-gray-800 leading-relaxed text-md sm:text-lg mt-4">
            Our skilled artisans bring decades of experience to each product, ensuring attention to detail and consistency in every pair.
          </p>
        </div>
      </motion.section>

      {/* Our Collection */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f7e6ea]"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7a0d2e]">Our Collection</h2>
          <p className="text-gray-800">
            Our footwear is designed for everyday wear—balancing modern style and conscious living. 
            Every collection embodies our brand values:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-md sm:text-lg">
            <li><span className="font-semibold">100% Vegan and Cruelty-Free</span> — no animal-derived materials used.</li>
            <li><span className="font-semibold">Premium, Sustainable Materials</span> — thoughtfully selected for longevity and comfort.</li>
            <li><span className="font-semibold">Timeless Aesthetics with Modern Comfort</span> — pieces that pair with many wardrobes.</li>
            <li><span className="font-semibold">Responsible Manufacturing Practices</span> — transparency and care throughout production.</li>
            <li><span className="font-semibold">Community & Giving Back</span> — supporting initiatives that improve lives and the environment.</li>
          </ul>
        </div>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto space-y-6 text-center p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#7a0d2e]">OUR MISSION</h2>
          <p className="text-gray-800 text-md sm:text-lg leading-relaxed">
            We aim to inspire conscious choices by proving that sustainability and luxury can walk hand in hand. 
            Our mission goes beyond creating footwear — it is about building a future where fashion respects people, 
            animals, and the planet. Alongside our commitment to sustainable practices, we prioritize your trust and 
            safety. Every purchase is supported by secure transactions, trusted gateways, and complete data protection, 
            ensuring that your personal information is safeguarded at every step.
          </p>
          <p className="text-gray-800 text-md sm:text-lg leading-relaxed">
            Through education, awareness campaigns, and collaborations, we hope to foster a community of mindful consumers who value ethical choices and sustainable living.
          </p>
        </div>
      </motion.section>

      {/* Footer */}
     
    </div>
  );
}
