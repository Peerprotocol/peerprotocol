"use client";
import { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('solana');

  const options = [
    { value: 'solana', label: 'Solana', imgSrc: '/images/sol.svg' },
    { value: 'xion', label: 'Xion', imgSrc: '/images/xion-icon.png' },
  ];

  const handleSelectChange = (value: string) => {
    console.log('Selected Option:', value);
    setSelectedOption(value);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={options.find(option => option.value === selectedOption)?.imgSrc || '/images/xion-icon.png'}
            alt={selectedOption}
            className="w-5 h-5 mr-2"
          />
          {options.find(option => option.value === selectedOption)?.label || 'Select Chain'}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectChange(option.value)}
                className={`flex items-center w-full px-4 py-2 text-sm ${option.value === selectedOption ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                role="menuitem"
                tabIndex={0}
                type='button'
              >
                <img
                  src={option.imgSrc}
                  alt={option.label}
                  className="w-5 h-5 mr-2"
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
