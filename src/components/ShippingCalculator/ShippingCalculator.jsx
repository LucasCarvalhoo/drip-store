// src/components/ShippingCalculator/ShippingCalculator.jsx
import React, { useState } from 'react';
import styles from './ShippingCalculator.module.css';

const ShippingCalculator = ({ onCalculateShipping }) => {
  const [zipCode, setZipCode] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (zipCode.trim()) {
      onCalculateShipping(zipCode);
    }
  };
  
  return (
    <div className={styles.shippingContainer}>
      <div className={styles.shippingHeader}>
        <h3 className={styles.shippingTitle}>Calcular frete</h3>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.shippingForm}>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Insira seu CEP"
          className={styles.shippingInput}
          aria-label="CEP para cálculo de frete"
        />
        <button 
          type="submit" 
          className={styles.shippingButton}
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default ShippingCalculator;