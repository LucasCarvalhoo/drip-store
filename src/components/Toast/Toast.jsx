import React, { useEffect } from 'react';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cart':
        return <ShoppingCart className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-green-500 shadow-lg';
      case 'cart':
        return 'bg-white border-l-4 border-blue-500 shadow-lg';
      default:
        return 'bg-white border-l-4 border-green-500 shadow-lg';
    }
  };

  return (
    <div className={`${styles.toastContainer} ${isVisible ? styles.toastVisible : ''}`}>
      <div className={`${styles.toast} ${getStyles()}`}>
        <div className="flex items-center p-4">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-900">
              {message}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;