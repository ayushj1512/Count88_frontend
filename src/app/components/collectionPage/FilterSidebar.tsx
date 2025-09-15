"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Custom Slider Component
function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
}: {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <div className="flex justify-between w-full text-sm text-gray-600">
        <span>{min}</span>
        <span className="font-semibold text-[#7a0d2e]">{value}</span>
        <span>{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full accent-[#7a0d2e] cursor-pointer"
      />
    </div>
  );
}

// 🔹 Accordion Component
export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      {/* Card Container */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#7a0d2e]" />
            <span className="text-lg">Filter Options</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#7a0d2e]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#7a0d2e]" />
          )}
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-5 py-6 bg-gray-50 border-t border-gray-200"
            >
              <div className="space-y-6">
                {/* Slider Section */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <Slider min={100} max={1000} step={50} defaultValue={500} />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-3 text-sm">
                    {["Men", "Women", "Kids"].map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="accent-[#7a0d2e] w-4 h-4 rounded"
                        />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full py-3 rounded-xl font-semibold bg-[#7a0d2e] text-white shadow-md hover:bg-[#600a24] transition">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
