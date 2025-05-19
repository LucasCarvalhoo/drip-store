// src/pages/Orders/Orders.jsx
import React from 'react';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import OrdersList from '../../components/OrdersList/OrdersList';
import styles from './Orders.module.css';

const Orders = () => {
  // Sample order data - in a real app, this would come from an API or context
  const orders = [
    {
      id: '2234801932',
      productName: 'Tênis Nike Revolution 6 Next Nature Masculino',
      productImage: '../images/products/produc-image-7.png',
      status: 'transit'
    },
    {
      id: '4488810492',
      productName: 'Tênis Nike Revolution 6 Next Nature Masculino',
      productImage: '../images/products/produc-image-7.png',
      status: 'completed'
    },
    {
      id: '4488810493',
      productName: 'Tênis Nike Revolution 6 Next Nature Masculino',
      productImage: '../images/products/produc-image-7.png',
      status: 'canceled'
    },
    {
      id: '4488810494',
      productName: 'Tênis Nike Revolution 6 Next Nature Masculino',
      productImage: '../images/products/produc-image-7.png',
      status: 'completed'
    },
    {
      id: '4488810495',
      productName: 'Tênis Nike Revolution 6 Next Nature Masculino',
      productImage: '../images/products/produc-image-7.png',
      status: 'completed'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className={styles.ordersPage}>
          {/* Account Sidebar */}
          <div className={styles.sidebarContainer}>
            <AccountSidebar />
          </div>
          
          {/* Orders Content */}
          <div className={styles.contentContainer}>
            <OrdersList orders={orders} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;