// src/components/CartItem/CartItem.jsx
import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onRemove 
}) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={styles.cartItem}>
      {/* Product Column (PRODUTO) */}
      <div className={styles.productColumn}>
        <div className={styles.productImage}>
          <img 
            src={product.imagemUrl} 
            alt={product.nome} 
            className={styles.image}
          />
        </div>
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.nome}</h3>
          <p className={styles.productOption}>Cor: {product.cor}</p>
          <p className={styles.productOption}>Tamanho: {product.tamanho}</p>
          <button onClick={onRemove} className={styles.removeLink}>
            Remover item
          </button>
        </div>
      </div>

      {/* Quantity Column (QUANTIDADE) */}
      <div className={styles.quantityColumn}>
        <div className={styles.quantityControls}>
          <button 
            onClick={decreaseQuantity}
            className={styles.quantityButton}
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className={styles.quantityInput}
            aria-label="Quantidade"
          />
          <button 
            onClick={increaseQuantity}
            className={styles.quantityButton}
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      {/* Unit Price Column (UNITÁRIO) */}
      <div className={styles.unitPriceColumn}>
        {product.precoOriginal > product.precoAtual && (
          <p className={styles.originalPrice}>R$ {product.precoOriginal.toFixed(2)}</p>
        )}
        <p className={styles.currentPrice}>R$ {product.precoAtual.toFixed(2)}</p>
      </div>

      {/* Total Column (TOTAL) */}
      <div className={styles.totalColumn}>
        <p className={styles.currentPrice}>R$ {(product.precoAtual * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;