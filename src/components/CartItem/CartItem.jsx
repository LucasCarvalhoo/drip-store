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
      {/* Product Image */}
      <div className={styles.productImage}>
        <img 
          src={product.imagemUrl} 
          alt={product.nome} 
          className={styles.image}
        />
      </div>

      {/* Product Details */}
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.nome}</h3>
        
        {/* Color and Size */}
        <div className={styles.productOptions}>
          <p className={styles.productOption}>Cor: {product.cor}</p>
          <p className={styles.productOption}>Tamanho: {product.tamanho}</p>
        </div>

        {/* Quantity Controls - Mobile Only */}
        <div className={styles.mobileControls}>
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
          
          <div className={styles.mobilePrice}>
            <p className={styles.currentPrice}>R$ {product.precoAtual.toFixed(2)}</p>
            {product.precoOriginal > product.precoAtual && (
              <p className={styles.originalPrice}>R$ {product.precoOriginal.toFixed(2)}</p>
            )}
          </div>
        </div>

        {/* Remove Link - Mobile */}
        <button 
          onClick={onRemove} 
          className={styles.removeLink}
        >
          Remover item
        </button>
      </div>

      {/* Desktop Layout Elements - Hidden on Mobile */}
      <div className={styles.desktopQuantity}>
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

      {/* Unit Price - Desktop */}
      <div className={styles.desktopUnitPrice}>
        {product.precoOriginal > product.precoAtual && (
          <p className={styles.originalPrice}>R$ {product.precoOriginal.toFixed(2)}</p>
        )}
        <p className={styles.currentPrice}>R$ {product.precoAtual.toFixed(2)}</p>
      </div>

      {/* Total Price - Desktop */}
      <div className={styles.desktopTotalPrice}>
        <p className={styles.currentPrice}>R$ {(product.precoAtual * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;