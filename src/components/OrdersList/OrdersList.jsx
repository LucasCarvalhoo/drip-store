// src/components/OrdersList/OrdersList.jsx
import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrdersList.module.css';

/**
 * OrdersList Component - Displays a list of orders
 * 
 * @param {Object} props
 * @param {Array} props.orders - Array of order objects
 * @returns {JSX.Element} A list of order items
 */
const OrdersList = ({ orders = [] }) => {
  // If no orders are provided or the array is empty
  if (!orders || orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Você ainda não realizou nenhum pedido.</p>
        <a href="/produtos" className={styles.shopButton}>
          Ir às compras
        </a>
      </div>
    );
  }

  return (
    <div className={styles.ordersList}>
      <h2 className={styles.sectionTitle}>Meus Pedidos</h2>
      
      <div className={styles.ordersHeader}>
        <div className={styles.ordersInfo}>Pedido</div>
        <div className={styles.ordersStatus}>STATUS</div>
      </div>
      
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            orderId={order.id}
            productName={order.productName}
            productImage={order.productImage}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;