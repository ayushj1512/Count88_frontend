'use client';

import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

type FilterSidebarProps = {
  categories: string[];
  subcategories: string[];
  brands: string[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedBrands: string[];
  toggleFilter: (type: 'category' | 'subcategory' | 'brand', value: string) => void;
};

export default function FilterSidebar({
  categories,
  subcategories,
  brands,
  selectedCategories,
  selectedSubcategories,
  selectedBrands,
  toggleFilter,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderFilterSection = (
    title: string,
    items: string[],
    selected: string[],
    type: 'category' | 'subcategory' | 'brand'
  ) => (
    <div>
      <h3 className="text-base font-semibold mb-3 text-gray-800 flex items-center gap-2 uppercase tracking-wide">
        <FaFilter className="text-pink-500" />
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={`${type}-${item}`}
            className={`flex items-center gap-2 cursor-pointer text-sm rounded-md px-2 py-1 transition ${
              selected.includes(item)
                ? 'bg-pink-50 text-pink-600 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggleFilter(type, item)}
              className="accent-pink-600"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );

  const SidebarContent = (
    <div className="space-y-8">
      {renderFilterSection('Categories', categories, selectedCategories, 'category')}
      {renderFilterSection('Subcategories', subcategories, selectedSubcategories, 'subcategory')}
      {renderFilterSection('Brands', brands, selectedBrands, 'brand')}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          className="flex items-center gap-2 text-sm px-4 py-2 border rounded bg-white shadow hover:shadow-md transition"
          onClick={() => setIsOpen(true)}
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className="fixed inset-0 z-50 md:hidden pointer-events-none">
        {isOpen && (
          <div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-auto ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full md:w-64 shrink-0 border rounded-md bg-white shadow-sm p-5 sticky top-4 h-fit">
        {SidebarContent}
      </aside>
    </>
  );
}
