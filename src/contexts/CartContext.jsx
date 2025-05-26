// src/contexts/CartContext.jsx - SIMPLIFIED WORKING VERSION
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

  // Simple function to load cart data - no useCallback to avoid dependency issues
  const loadCart = async () => {
    try {
      setLoading(true);
      console.log('Loading cart data...');
      
      // Get or create cart
      const currentCartId = await getCart(user?.id);
      console.log('Cart ID:', currentCartId);
      setCartId(currentCartId);

      if (currentCartId) {
        // Load cart items
        const items = await getCartItems(currentCartId);
        console.log('Cart items loaded:', items);
        setCartItems(items);

        // Get cart summary
        const summary = await getCartSummary(currentCartId);
        console.log('Cart summary:', summary);
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

  // Load cart when user changes - simple dependency array
  useEffect(() => {
    loadCart();
  }, [user?.id]); // Only depend on user ID, not the whole user object

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log('CartContext: Cart update event received');
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []); // Empty dependency array - only set up listener once

  // Refresh cart data - simple function
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