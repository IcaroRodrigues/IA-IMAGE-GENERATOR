import { createContext, useContext, useState, useCallback } from 'react';
import ToastMessage from '../components/ToastMessage';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isVisible: false,
    title: '',
    type: 'info'
  });

  const openToast = useCallback(({ title, type = 'info' }) => {
    setToast({
      isVisible: true,
      title,
      type
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ openToast, closeToast }}>
      {children}
      <ToastMessage 
        title={toast.title}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};