// src/components/OrderItem/OrderItem.jsx
import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import styles from './OrderItem.module.css';

/**
 * OrderItem Component - Displays a single order with product details and status
 * 
 * @param {Object} props
 * @param {string} props.orderId - The order identification number
 * @param {string} props.productName - The name of the product
 * @param {string} props.productImage - URL to the product image
 * @param {string} props.status - Status of the order ('transit', 'completed', 'canceled')
 * @returns {JSX.Element} A component displaying order details
 */
const OrderItem = ({ orderId, productName, productImage, status }) => {
  // Function to determine which status badge to display
  const renderStatusBadge = () => {
    switch (status) {
      case 'transit':
        return <StatusBadge.Transit />;
      case 'completed':
        return <StatusBadge.Completed />;
      case 'canceled':
        return <StatusBadge.Canceled />;
      default:
        return <StatusBadge status="Desconhecido" type="default" />;
    }
  };

  return (
    <div className={styles.orderItem}>
      {/* Order identifier */}
      <div className={styles.orderNumber}>
        <span className={styles.orderLabel}>Pedido nº</span>
        <span className={styles.orderId}>{orderId}</span>
      </div>

      <div className={styles.orderContent}>
        {/* Product image */}
        <div className={styles.productImage}>
          <img 
            src={productImage} 
            alt={productName} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/src/assets/icons/icon-category-sneakers.svg"; // Fallback image
            }}
          />
        </div>

        {/* Product details */}
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{productName}</h3>
        </div>

        {/* Order status */}
        <div className={styles.orderStatus}>
          {renderStatusBadge()}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;