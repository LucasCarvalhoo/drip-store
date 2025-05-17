// src/components/DiscountCode/DiscountCode.jsx
import React, { useState } from 'react';
import styles from './DiscountCode.module.css';

const DiscountCode = ({ onApplyDiscount }) => {
  const [code, setCode] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onApplyDiscount(code);
    }
  };

  return (
    <div className={styles.discountContainer}>
      <div className={styles.discountHeader}>
        <h3 className={styles.discountTitle}>Cupom de desconto</h3>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.discountForm}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Insira seu código"
          className={styles.discountInput}
          aria-label="Código de desconto"
        />
        <button 
          type="submit" 
          className={styles.discountButton}
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default DiscountCode;