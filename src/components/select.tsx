"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface SelectProps {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
  label: string;
}

export default function Select({
  options,
  selected,
  setSelected,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleListOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <span>
          <ChevronDownIcon
            className={`size-4 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-sm">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                onClick={() => handleListOptionClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
