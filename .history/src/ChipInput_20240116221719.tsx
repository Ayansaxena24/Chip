// ChipInput.tsx

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import "./ChipInput.css"; // Import your CSS file (e.g., TailwindCss/SCSS)

interface Chip {
  id: number;
  label: string;
}

const ChipInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = [
    "Marina Augustine",
    "Anita Fros",
    "Nick Giannopoulos",
    "Alice Smith",
    "Bob Johnson",
  ];

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => !chips.find((chip) => chip.label === item))
    );
  }, [chips]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "" && chips.length > 0) {
      highlightLastChip();
    } else {
      setFilteredItems(
        items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  const handleChipClick = (item: string) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue(""); // Clear the input value after selecting a chip
    inputRef.current?.focus(); // Focus on the input field
  };

  const handleChipRemove = (id: number) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== id));
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      e.preventDefault();
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
    }
  };

  const highlightLastChip = () => {
    const lastChip = document.querySelector(".chip:last-child");
    if (lastChip) {
      lastChip.classList.add("highlighted");
    }
  };

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="absolute top-10">
        <img
          src="https://play-lh.googleusercontent.com/tjzK0-TCkXB1zxkmiRr5WNGJxQy87s1RdBx10nqLbdxRIH7bPWxTkH_YiUMbYPFRfmj7=w240-h480-rw"
          alt="Zepto"
          className="w-[100px] h-[100px] rounded-xl "
        />
      </div>
      <div className="flex flex-col w-[80vh]">
        <div className="flex flex-wrap">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className="bg-[#037bfc] text-white rounded-md m-[5px] pr-[30px] pl-[10px] py-[12px] cursor-pointer flex items-center relative"
              onClick={() => handleChipRemove(chip.id)}
            >
              {chip.label}
              <span className="hover:border-white hover:bg-red-600 duration-300 ease-in-out hover:border-2 hover:rounded-md px-1 mx-2 absolute right-0">
                X
              </span>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type to search..."
            className="rounded-md w-full pl-2 py-4"
          />
        </div>
        <ul
          className={`${
            chips.length !== 5
              ? "cursor-pointer p-[5px] m-[5px] border-white rounded-md border-[1px] border-solid flex flex-wrap"
              : ""
          }`}
        >
          {filteredItems.map((item) => (
            <li
              className="cursor-pointer p-[5px] m-[5px] border-[1px] border-[#ddd] rounded-md hover:text-black hover:bg-white duration-300 ease-in-out hover:scale-105"
              key={item}
              onClick={() => handleChipClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChipInput;
