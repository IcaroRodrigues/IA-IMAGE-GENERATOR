function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`bg-purple hover:bg-gray-700 text-white py-2 px-4 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
