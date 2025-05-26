// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';
import { getCart, getCartItems, getCartSummary } from '../services/cartService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart data
  const loadCart = async () => {
    try {
      setLoading(true);
      
      // Get or create cart
      const currentCartId = await getCart(user?.id);
      setCartId(currentCartId);

      if (currentCartId) {
        // Load cart items
        const items = await getCartItems(currentCartId);
        setCartItems(items);

        // Get cart summary
        const summary = await getCartSummary(currentCartId);
        setCartCount(summary.totalItems);
        setCartSubtotal(summary.subtotal);
      } else {
        // Reset cart state
        setCartItems([]);
        setCartCount(0);
        setCartSubtotal(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Reset cart state on error
      setCartItems([]);
      setCartCount(0);
      setCartSubtotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Load cart when user changes or component mounts
  useEffect(() => {
    loadCart();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh cart data
  const refreshCart = () => {
    loadCart();
  };

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    cartId,
    loading,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};