import React, { useState } from 'react';
import { getShippingCost } from '../../services/shippingService';
import styles from './ShippingCalculator.module.css';

const ShippingCalculator = ({ onCalculateShipping, cartTotal, freeShippingApplied = false }) => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [shippingResult, setShippingResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!zipCode.trim()) {
      setError('Digite um CEP válido.');
      return;
    }

    const cleanZipCode = zipCode.replace(/\D/g, '');
    if (cleanZipCode.length !== 8) {
      setError('CEP deve ter 8 dígitos.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const result = await getShippingCost(cleanZipCode, cartTotal || 0, freeShippingApplied);
      
      setShippingResult(result);
      
      // Notify parent component
      if (onCalculateShipping) {
        onCalculateShipping({
          zipCode: cleanZipCode,
          cost: result.cost,
          deliveryTime: result.deliveryTime,
          description: result.description,
          isFree: result.isFree
        });
      }

      // Show success message
      const message = result.isFree 
        ? `✅ Frete grátis!\n${result.description}\nEntrega: ${result.deliveryTime}`
        : `✅ Frete calculado!\nValor: R$ ${result.cost.toFixed(2).replace('.', ',')}\nEntrega: ${result.deliveryTime}`;
      
      alert(message);

    } catch (err) {
      console.error('Error calculating shipping:', err);
      setError(err.message || 'Erro ao calcular frete.');
      setShippingResult(null);
    } finally {
      setLoading(false);
    }
  };

  const formatZipCode = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleZipCodeChange = (e) => {
    const formatted = formatZipCode(e.target.value);
    setZipCode(formatted);
    
    // Clear previous results when typing
    if (shippingResult) {
      setShippingResult(null);
    }
    if (error) {
      setError('');
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
          placeholder="00000-000"
          className={styles.shippingInput}
          aria-label="CEP para cálculo de frete"
          maxLength="9"
          disabled={loading}
        />
        <button 
          type="submit" 
          className={styles.shippingButton}
          disabled={loading || !zipCode.trim()}
        >
          {loading ? '...' : 'OK'}
        </button>
      </form>

      {/* Shipping Result Display */}
      {shippingResult && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm">
            <p className="font-medium text-blue-800">
              {shippingResult.isFree ? 'Frete Grátis!' : `Frete: R$ ${shippingResult.cost.toFixed(2).replace('.', ',')}`}
            </p>
            <p className="text-blue-600 text-xs mt-1">
              {shippingResult.description}
            </p>
            <p className="text-blue-600 text-xs">
              Prazo de entrega: {shippingResult.deliveryTime}
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Free Shipping Notice */}
      {!freeShippingApplied && cartTotal >= 200 && (
        <div className="mt-2 text-xs text-green-600">
          🎉 Você tem frete grátis! (Compras acima de R$ 200,00)
        </div>
      )}

      {/* Almost Free Shipping Notice */}
      {!freeShippingApplied && cartTotal > 0 && cartTotal < 200 && (
        <div className="mt-2 text-xs text-amber-600">
          💡 Faltam R$ {(200 - cartTotal).toFixed(2).replace('.', ',')} para frete grátis!
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;