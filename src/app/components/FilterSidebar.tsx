'use client';

import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

type FilterType = 'category' | 'subcategory' | 'brand' | 'tag';

type FilterSidebarProps = {
  categories: string[];
  subcategories: string[];
  brands: string[];
  tags: string[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedBrands: string[];
  selectedTags: string[];
  toggleFilter: (type: FilterType, value: string) => void;
};

export default function FilterSidebar({
  categories,
  subcategories,
  brands,
  tags,
  selectedCategories,
  selectedSubcategories,
  selectedBrands,
  selectedTags,
  toggleFilter,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderFilterSection = (
    title: string,
    items: string[],
    selected: string[],
    type: FilterType
  ) => (
    <div>
      <h3 className="text-sm font-bold mb-3 text-gray-700 uppercase tracking-wider flex items-center gap-2">
        <FaFilter className="text-orange-500" />
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={`${type}-${item}`}
            className={`flex items-center gap-2 cursor-pointer text-sm rounded-lg px-3 py-1.5 transition-all ${
              selected.includes(item)
                ? 'bg-orange-100 text-orange-700 font-semibold shadow-sm'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggleFilter(type, item)}
              className="accent-orange-600"
              aria-label={`${type}-${item}`}
            />
            <span className="capitalize">{item}</span>
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
      {renderFilterSection('Tags', tags, selectedTags, 'tag')}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:shadow-md transition font-medium"
          onClick={() => setIsOpen(true)}
          aria-label="Open Filters"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className="fixed inset-0 z-50 md:hidden pointer-events-none">
        {isOpen && (
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-auto z-50 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black"
                aria-label="Close Filters"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full md:w-64 shrink-0 border rounded-xl bg-white shadow p-5 sticky top-4 h-fit">
        {SidebarContent}
      </aside>
    </>
  );
}
