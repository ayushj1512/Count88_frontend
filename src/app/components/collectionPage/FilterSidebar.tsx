"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilterType = {
  categories?: string[];
  brands?: string[];
  price?: { min: number; max: number; step: number };
};

type FilterSidebarProps = {
  filters: FilterType;
  selected: {
    categories: string[];
    brands: string[];
    price: number;
  };
  onChange: (filter: {
    categories?: string[];
    brands?: string[];
    price?: number;
  }) => void;
};

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
      <div className="flex justify-between w-full text-xs text-gray-600">
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

// 🔹 Collapsible Card Component
function CollapsibleCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#7a0d2e]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#7a0d2e]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-3 bg-gray-50 text-sm space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔹 Filter Sidebar Component with Drawer
export default function FilterSidebar({
  filters,
  selected,
  onChange,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategoryChange = (cat: string) => {
    const updated = selected.categories.includes(cat)
      ? selected.categories.filter((c) => c !== cat)
      : [...selected.categories, cat];
    onChange({ categories: updated });
  };

  const handleBrandChange = (brand: string) => {
    const updated = selected.brands.includes(brand)
      ? selected.brands.filter((b) => b !== brand)
      : [...selected.brands, brand];
    onChange({ brands: updated });
  };

  const handlePriceChange = (value: number) => {
    onChange({ price: value });
  };

  // Sidebar content
  const SidebarContent = (
    <div className="w-72 bg-gray-50 h-full p-4 space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#7a0d2e]" />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        {/* Close button (mobile only) */}
        <button
          className="lg:hidden text-gray-600 hover:text-[#7a0d2e]"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Price Range */}
      {filters.price && (
        <CollapsibleCard title="Price Range" defaultOpen>
          <Slider
            min={filters.price.min}
            max={filters.price.max}
            step={filters.price.step}
            defaultValue={selected.price}
            onChange={handlePriceChange}
          />
        </CollapsibleCard>
      )}

      {/* Categories */}
      {filters.categories && (
        <CollapsibleCard title="Categories">
          <div className="space-y-2">
            {filters.categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="accent-[#7a0d2e] w-4 h-4 rounded"
                />
                <span className="text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        </CollapsibleCard>
      )}

      {/* Brands */}
      {filters.brands && (
        <CollapsibleCard title="Brands">
          <div className="space-y-2">
            {filters.brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-[#7a0d2e] w-4 h-4 rounded"
                />
                <span className="text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </CollapsibleCard>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block border-r border-gray-200 h-screen">
        {SidebarContent}
      </aside>

      {/* Mobile Button */}
      <div className="lg:hidden p-2">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7a0d2e] text-white rounded-lg shadow-md"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 bg-white w-72 shadow-lg"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
