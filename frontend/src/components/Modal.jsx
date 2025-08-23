export const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[820px] min-h-[200px] mx-4 bg-blue-300 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={onClose}
            className="w-12 h-12 bg-gray-600 hover:bg-gray-300 text-white flex items-center justify-center rounded-xl text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
