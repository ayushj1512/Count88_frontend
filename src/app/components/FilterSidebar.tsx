'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'price' | 'size' | 'color' | 'discount' | 'gender';

type FilterBarProps = {
  filters: {
    price: string[];
    size: string[];
    color: string[];
    discount: string[];
    gender: string[];
  };
  selected: {
    price: string[];
    size: string[];
    color: string[];
    discount: string[];
    gender: string[];
  };
  toggleFilter: (type: FilterType, value: string) => void;
};

export default function FilterBar({ filters, selected, toggleFilter }: FilterBarProps) {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const renderDropdown = (type: FilterType, options: string[]) => {
    const selectedItems = selected[type];

    return (
      <div className="relative flex flex-col">
        {/* Filter Button */}
        <button
          onClick={() => setOpenFilter(openFilter === type ? null : type)}
          className={`px-4 py-2 rounded-full border transition-all font-medium text-sm whitespace-nowrap flex items-center justify-between ${
            selectedItems.length
              ? 'bg-red-100 border-red-300 text-red-900'
              : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {openFilter === type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scroll"
            >
              {options.map((option) => {
                const isSelected = selectedItems.includes(option);
                return (
                  <button
                    key={`${type}-${option}`}
                    onClick={() => toggleFilter(type, option)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all whitespace-nowrap text-center ${
                      isSelected
                        ? 'bg-red-900 text-white border-red-900'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-red-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center justify-start overflow-x-auto scrollbar-hide">
        {renderDropdown('price', filters.price)}
        {renderDropdown('size', filters.size)}
        {renderDropdown('color', filters.color)}
        {renderDropdown('discount', filters.discount)}
        {renderDropdown('gender', filters.gender)}
      </div>

      {/* Selected Filters */}
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.keys(selected).map((type) =>
          selected[type as FilterType].map((item) => (
            <div
              key={`${type}-${item}`}
              className="flex items-center gap-1 bg-red-100 text-red-900 text-xs px-2 py-1 rounded-full border border-red-300"
            >
              <span>{item}</span>
              <button
                onClick={() => toggleFilter(type as FilterType, item)}
                className="font-bold"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
