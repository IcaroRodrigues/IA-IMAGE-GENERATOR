import React, { useState } from 'react';
import searchicon from '../assets/searchicon.svg';

function Input({
  value = '',
  error = '',
  setValue = () => {},
  iconsearch = false,
  iconStart = null,
  variant = '',
  label = '',
  placeholder = '',
  onSearch = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const baseStyles = 'w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition';

  const variants = {
    primary:
      'bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:border-gray-50 shadow-none focus:ring-0 h-full',
    secondary:
      'bg-gray-600 border border-gray-200 text-white placeholder-gray-300 focus:border-gray-50 shadow-none focus:ring-0 h-full',
  };

  const errorStyle = error ? 'border-red focus:border-red' : '';

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
              isFocused ? 'text-gray-50' : 'text-gray-400'
            }`}
          >
            {iconStart}
          </span>
        )}

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        )}
      </div>

      {error && (
        <p className="text-red text-xs mt-1">
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
