// ChipInput.tsx

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
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
    "John Doe",
    "Jane Doe",
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
    setInputValue("");
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
    <div className="w-screen flex justify-center items-center">
      <div className="flex flex-col w-[50vh]">
        <div className="flex flex-wrap">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className="bg-[]"
              onClick={() => handleChipRemove(chip.id)}
            >
              {chip.label}
              <span className="chip-remove">X</span>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type to search..."
          />
        </div>
        <ul className="item-list">
          {filteredItems.map((item) => (
            <li key={item} onClick={() => handleChipClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChipInput;
