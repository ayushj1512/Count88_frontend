"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

type FilterSidebarProps = {
  categories: string[];
  subcategories: string[];
  allSizes: string[];
  category: string;
  setCategory: (v: string) => void;
  subcategory: string;
  setSubcategory: (v: string) => void;
  sizes: string[];
  toggleSize: (s: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  clearAllFilters: () => void;
  showMobile: boolean;
  setShowMobile: (v: boolean) => void;
};

export default function FilterSidebar({
  categories,
  subcategories,
  allSizes,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  sizes,
  toggleSize,
  priceRange,
  setPriceRange,
  clearAllFilters,
  showMobile,
  setShowMobile,
}: FilterSidebarProps) {
  const [categoryOpen, setCategoryOpen] = React.useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = React.useState(true);
  const [sizeOpen, setSizeOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  const renderRadioFilter = (
    title: string,
    options: string[],
    selected: string,
    onChange: (val: string) => void
  ) => (
    <div className="space-y-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={title}
            value={opt}
            checked={selected === opt}
            onChange={() => onChange(opt)}
            className="accent-gray-800"
          />
          {opt}
        </label>
      ))}
    </div>
  );

  // Desktop version
  const desktopFilters = (
    <div className="border p-4 rounded space-y-6">
      <h3 className="font-bold text-lg mt-4">Categories</h3>
      {renderRadioFilter("category", categories, category, setCategory)}

      <h3 className="font-bold text-lg mt-4">Subcategories</h3>
      {renderRadioFilter("subcategory", subcategories, subcategory, setSubcategory)}

      <h3 className="font-bold text-lg mt-4">Sizes</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {allSizes.map((s) => (
          <button
            key={s}
            onClick={() => toggleSize(s)}
            className={`border px-2 py-1 rounded ${
              sizes.includes(s) ? "bg-gray-800 text-white" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <h3 className="font-bold text-lg mt-4">Price</h3>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between text-sm">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full"
        />
      </div>
      <button
        onClick={clearAllFilters}
        className="bg-red-600 text-white px-2 py-1 rounded w-full"
      >
        Clear All Filters
      </button>
    </div>
  );

  // Mobile drawer version
  const mobileFilters = (
    <AnimatePresence>
      {showMobile && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed inset-0 bg-white z-50 w-64 p-4 shadow-lg overflow-y-auto"
        >
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowMobile(false)}>
              <X />
            </button>
          </div>

          <button
            onClick={clearAllFilters}
            className="bg-red-600 text-white px-2 py-1 rounded mb-4 w-full"
          >
            Clear All Filters
          </button>

          {/* Collapsible Sections */}
          <div>
            <div
              className="flex justify-between cursor-pointer items-center"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <h3 className="font-bold text-lg">Categories</h3>
              {categoryOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
              {categoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1 overflow-hidden mt-2"
                >
                  {renderRadioFilter("category", categories, category, setCategory)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <div
              className="flex justify-between cursor-pointer items-center"
              onClick={() => setSubcategoryOpen(!subcategoryOpen)}
            >
              <h3 className="font-bold text-lg">Subcategories</h3>
              {subcategoryOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
              {subcategoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1 overflow-hidden mt-2"
                >
                  {renderRadioFilter("subcategory", subcategories, subcategory, setSubcategory)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <div
              className="flex justify-between cursor-pointer items-center"
              onClick={() => setSizeOpen(!sizeOpen)}
            >
              <h3 className="font-bold text-lg">Sizes</h3>
              {sizeOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
              {sizeOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2 mt-2 overflow-hidden"
                >
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`border px-2 py-1 rounded ${
                        sizes.includes(s) ? "bg-gray-800 text-white" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <div
              className="flex justify-between cursor-pointer items-center"
              onClick={() => setPriceOpen(!priceOpen)}
            >
              <h3 className="font-bold text-lg">Price</h3>
              {priceOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
              {priceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 space-y-2 overflow-hidden"
                >
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="hidden md:block w-64 mr-4">{desktopFilters}</div>
      {mobileFilters}
    </>
  );
}
