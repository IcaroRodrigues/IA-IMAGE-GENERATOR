function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-purple hover:opacity-90 hover:transition-opacity text-white font-semibold py-2 px-4 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
