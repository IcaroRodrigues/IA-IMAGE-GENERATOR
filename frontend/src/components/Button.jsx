function Button({ onClick, className = '', active = false, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center ${
        active ? 'bg-purple-300' : 'bg-gray-600'
      } hover:opacity-90 hover:transition-opacity text-white font-semibold py-2 px-4 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
