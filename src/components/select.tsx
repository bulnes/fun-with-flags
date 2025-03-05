"use client";

import { generateRandomId } from "@/utils/generators";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

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
  const listId = generateRandomId("listbox-");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (isOpen) {
      // Apply a focus on the list when it opens
      listRef.current?.focus();
      // Reset the focused index when the list opens
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleListOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.preventDefault();

    switch (event.code) {
      case "ArrowDown":
        setFocusedIndex((currentIndex) =>
          currentIndex + 1 < options.length ? currentIndex + 1 : 0
        );
        break;

      case "ArrowUp":
        setFocusedIndex((currentIndex) =>
          currentIndex - 1 >= 0 ? currentIndex - 1 : options.length - 1
        );
        break;

      case "Enter":
      case "Space":
        setSelected(options[focusedIndex]);
        setIsOpen(false);
        buttonRef.current?.focus();
        break;

      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox" // This button will control a list
        aria-expanded={isOpen} // The list is open or closed
        aria-labelledby={listId} // The label for the list
        className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={() => setIsOpen((isCurrentOpen) => !isCurrentOpen)}
        onKeyDown={handleButtonKeyDown}
      >
        <span>{selected}</span>
        <ChevronDownIcon
          className={`size-4 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox" // This is a list of options
          id={listId}
          tabIndex={0} // The list can be focused
          aria-activedescendant={`option-${focusedIndex}`} // The currently focused option
          className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden focus:ring-2 focus:ring-blue-500 focus:outline-none z-10"
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={option === selected}
            >
              <button
                type="button"
                className={`w-full px-4 py-2 text-left cursor-pointer ${
                  focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
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
