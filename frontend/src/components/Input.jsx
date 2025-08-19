import React, { useState } from 'react';
import searchicon from '../assets/searchicon.svg';

function Input({
  value = '',
  error = '',
  setValue = () => {},
  iconsearch = false,
  variant = '',
  label = '',
  placeholder = '',
  icon = null,
  onSearch = () => {},
  ...props
}) {
  const baseStyles = 'w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition';

  const variants = {
    primary:
      'bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500',
    secondary:
      'bg-gray-600 border border-gray-200 text-white focus:ring-blue-500 focus:border-purple-500',
  };

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

      <div className="relative mt-[12px]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${baseStyles} ${variants[variant]} pr-10`}
          {...props}
        />

        {iconsearch === true && (
          <img
            src={searchicon}
            alt="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Input;
