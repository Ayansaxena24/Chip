import React, { useState, useEffect, useRef } from 'react';
import Chip from './Chip';
import './ChipInput.css';

interface ChipInputProps {
  chips: string[];
  onAddChip: (chip: string) => void;
  onDeleteChip: (chip: string) => void;
}

const ChipInput: React.FC<ChipInputProps> = ({ chips, onAddChip, onDeleteChip }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedChips(chips);
  }, [chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue.trim() !== '') {
        onAddChip(inputValue.trim());
        setInputValue('');
      }
    } else if (event.key === 'Backspace' && inputValue.trim() === '') {
      if (selectedChips.length > 0) {
        const chipToRemove = selectedChips[selectedChips.length - 1];
        onDeleteChip(chipToRemove);
        setSelectedChips(selectedChips.slice(0, -1));
      }
    }
  };

  const handleChipClick = (chip: string) => {
    const index = selectedChips.indexOf(chip);
    if (index > -1) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleChipDelete = (chip: string) => {
    onDeleteChip(chip);
    setSelectedChips(selectedChips.filter((c) => c !== chip));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const selectionStart = inputValue.length + selectedChips.length * 10;
      inputRef.current.setSelectionRange(selectionStart, selectionStart);
    }
  }, [inputValue, selectedChips]);

  return (
    <div className="chip-input">
      <div className="selected-chips">
        {selectedChips.map((chip) => (
          <Chip key={chip} label={chip} onClick={() => handleChipClick(chip)} onDelete={() => handleChipDelete(chip)} />
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="input-field"
        placeholder="Add a chip"
      />
    </div>
  );
};

export default ChipInput;