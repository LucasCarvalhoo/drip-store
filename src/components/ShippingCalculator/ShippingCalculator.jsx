// src/components/ShippingCalculator/ShippingCalculator.jsx
import React, { useState } from 'react';
import styles from './ShippingCalculator.module.css';

const ShippingCalculator = ({ onCalculateShipping }) => {
  const [zipCode, setZipCode] = useState('');
  
  // Format the ZIP code as 00000-000
  const formatZipCode = (value) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 5) {
      return numbers;
    }
    
    return `${numbers.substring(0, 5)}-${numbers.substring(5, 8)}`;
  };
  
  const handleZipCodeChange = (e) => {
    const formattedZipCode = formatZipCode(e.target.value);
    setZipCode(formattedZipCode);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove formatting and validate
    const cleanZipCode = zipCode.replace(/\D/g, '');
    if (cleanZipCode.length === 8) {
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
          onChange={handleZipCodeChange}
          placeholder="Insira seu CEP"
          className={styles.shippingInput}
          maxLength="9"
          aria-label="CEP para cálculo de frete"
        />
        <button 
          type="submit" 
          className={styles.shippingButton}
          disabled={zipCode.replace(/\D/g, '').length !== 8}
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default ShippingCalculator;