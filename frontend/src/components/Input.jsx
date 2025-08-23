import React, { useState } from 'react';
import searchicon from '../assets/searchicon.svg';

function Input({
  value = '',
  error = '',
  setValue = () => {},
  onChange = null,
  onBlur = null,
  onFocus = null,
  iconsearch = false,
  iconStart = null,
  variant = '',
  label = '',
  placeholder = '',
  onSearch = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const baseStyles = 'w-full px-4 py-2 rounded-lg focus:outline-none transition';

  const variants = {
    primary:
      'bg-blue-300 border border-gray-600 text-white placeholder-gray-300 focus:placeholder-gray-50 focus:border-gray-50 !shadow-none !ring-0 focus:!ring-0 focus:!shadow-none h-full',
    secondary:
      'bg-gray-600 border border-gray-200 text-white placeholder-gray-300 focus:placeholder-gray-50 focus:border-gray-50 !shadow-none !ring-0 focus:!ring-0 focus:!shadow-none h-full',
  };

  const errorStyle = error ? 'border-red-300 focus:border-red-300' : '';

  const handleSearch = () => {
    if (!value.trim()) {
      setError('Por favor, preencha o campo antes de pesquisar.');
    } else {
      setError('');
      onSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      {label && <p className="text-gray-300">{label}</p>}

      <div className="relative flex items-center h-[45px]">
        {iconStart && (
          <span
            className={`absolute left-3 text-lg transition-colors ${
              isFocused ? 'text-gray-50' : 'text-gray-300'
            }`}
          >
            {iconStart}
          </span>
        )}

        <input
          value={value}
          onChange={onChange || ((e) => setValue(e.target.value))}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          placeholder={placeholder}
          className={`${baseStyles} ${variants[variant]} ${errorStyle} ${
            iconStart ? 'pl-10' : ''
          } ${iconsearch ? 'pr-10' : ''}`}
          {...props}
        />

        {iconsearch && (
          <img
            src={searchicon}
            alt="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 cursor-pointer"
            onClick={handleSearch}
          />
        )}
      </div>

      {error && (
        <p className="text-red-300 text-xs mt-1">
          <span className="">
            <i class="las la-times-circle"></i>
          </span>{' '}
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
