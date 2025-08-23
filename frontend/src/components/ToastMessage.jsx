import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastMessage = ({ title, type, onClose, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const typeStyles = {
    success: 'bg-green-300 border-green-500',
    error: 'bg-red-300 border-red-500',
    warning: 'bg-yellow-300 border-yellow-500',
    info: 'bg-blue-100 border-blue-300'
  }[type] || 'bg-blue-100 border-blue-300';

  const icons = {
    success: 'las la-check-circle',
    error: 'las la-times-circle',
    warning: 'las la-exclamation-triangle',
    info: 'las la-info-circle'
  }[type] || 'las la-info-circle';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className={`fixed bottom-36 right-4 z-50 flex items-center gap-3 px-4 py-2 rounded-lg border-l-4 text-black shadow-lg ${typeStyles}`}
        >
          <i className={`${icons} text-2xl`}></i>
          <p className="font-medium">{title}</p>
          <button 
            onClick={onClose}
            className="ml-4 hover:opacity-80 transition-opacity"
          >
            <i className="las la-times text-[16px]"></i>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastMessage;