import React, { useState, useRef, useEffect } from 'react';
import './customDropdown.css';

export default function CustomDropdown({ value, options, onChange, placeholder = "Select...", name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const activeValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === activeValue) || options.find(opt => opt === activeValue);
  const displayValue = selectedOption?.label || selectedOption || activeValue || placeholder;

  const handleSelect = (val) => {
    setInternalValue(val);
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="custom-select-menu">
          {options.map((opt, i) => {
            const optVal = opt.value !== undefined ? opt.value : opt;
            const optLabel = opt.label !== undefined ? opt.label : opt;
            return (
              <div 
                key={i} 
                className={`custom-select-item ${activeValue === optVal ? 'selected' : ''}`}
                onClick={() => handleSelect(optVal)}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
