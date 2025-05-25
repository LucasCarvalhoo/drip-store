// src/pages/Cart/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import DiscountCode from '../../components/DiscountCode/DiscountCode';
import ShippingCalculator from '../../components/ShippingCalculator/ShippingCalculator';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useUser } from '../../contexts/UserContext';
import {
  getCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  getCartSummary,
  clearCart
} from '../../services/cartService';
import { getFeaturedProducts } from '../../services/productService';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // For individual item actions
  const [cartId, setCartId] = useState(null);
  
  // Cart calculations
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart data
  useEffect(() => {
    const loadCartData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get or create cart
        const currentCartId = await getCart(user?.id);
        setCartId(currentCartId);

        if (currentCartId) {
          // Load cart items
          const items = await getCartItems(currentCartId);
          setCartItems(items);

          // Calculate subtotal
          const cartSummary = await getCartSummary(currentCartId);
          setSubtotal(cartSummary.subtotal);
        }

        // Load related products for empty cart or recommendations
        try {
          const featured = await getFeaturedProducts(4);
          setRelatedProducts(featured);
        } catch (featuredError) {
          console.error('Error loading featured products:', featuredError);
          // Continue without related products
        }

      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Erro ao carregar carrinho. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, [user]);

  // Update cart summary when items change
  useEffect(() => {
    const calculateSubtotal = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + (item.precoUnitario * item.quantidade), 
        0
      );
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (actionLoading === itemId) return;

    try {
      setActionLoading(itemId);
      setError(null);

      // Update in database
      await updateCartItemQuantity(itemId, newQuantity);

      // Update local state
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantidade: newQuantity } : item
        )
      );

    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Erro ao atualizar quantidade. Tente novamente.');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (itemId) => {
    if (actionLoading === itemId) return;

    // Confirm removal
    if (!window.confirm('Deseja remover este item do carrinho?')) {
      return;
    }

    try {
      setActionLoading(itemId);
      setError(null);

      // Remove from database
      await removeCartItem(itemId);

      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));

    } catch (err) {
      console.error('Error removing item:', err);
      setError('Erro ao remover item. Tente novamente.');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle discount code application
  const handleApplyDiscount = (code) => {
    console.log(`Applying discount code: ${code}`);
    
    // Mock discount logic - replace with real implementation
    const discountCodes = {
      'DESCONTO10': 10,
      'DESCONTO20': 20,
      'BEMVINDO': 15
    };

    const discountValue = discountCodes[code.toUpperCase()];
    
    if (discountValue) {
      const discountAmount = (subtotal * discountValue) / 100;
      setDiscount(discountAmount);
      alert(`Desconto de ${discountValue}% aplicado com sucesso!`);
    } else {
      alert('Código de desconto inválido.');
    }
  };

  // Handle shipping calculation
  const handleCalculateShipping = (zipCode) => {
    console.log(`Calculating shipping for: ${zipCode}`);
    
    // Mock shipping logic - replace with real implementation
    if (zipCode.replace(/\D/g, '').length === 8) {
      // Free shipping for orders over R$ 200
      const shippingCost = subtotal >= 200 ? 0 : 15.90;
      setShipping(shippingCost);
      
      const message = shippingCost === 0 
        ? 'Frete grátis para sua região!'
        : `Frete: R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
      alert(message);
    } else {
      alert('CEP inválido. Digite um CEP válido com 8 dígitos.');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    if (!user) {
      alert('Faça login para finalizar sua compra.');
      navigate('/login');
      return;
    }

    console.log('Proceeding to checkout');
    navigate('/checkout');
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (!cartId || cartItems.length === 0) return;

    if (!window.confirm('Deseja esvaziar todo o carrinho?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await clearCart(cartId);
      setCartItems([]);
      setSubtotal(0);
      setDiscount(0);
      setShipping(0);

    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Erro ao esvaziar carrinho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className={styles.cartContent}>
              <div className={styles.cartMain}>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cartSummary}>
                <div className="bg-gray-200 h-64 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ops! Algo deu errado</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => navigate('/produtos')}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          // Empty cart state
          <div className={styles.emptyCart}>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
              <p className="text-gray-600 mb-6">
                Que tal adicionar alguns produtos incríveis ao seu carrinho?
              </p>
              <button
                onClick={() => navigate('/produtos')}
                className={styles.continueShoppingButton}
              >
                Continuar Comprando
              </button>
            </div>

            {/* Show related products for empty cart */}
            {relatedProducts.length > 0 && (
              <div className={styles.relatedProducts}>
                <div className={styles.relatedProductsHeader}>
                  <h2 className={styles.relatedProductsTitle}>Produtos em Destaque</h2>
                  <button
                    onClick={() => navigate('/produtos')}
                    className={styles.viewAllLink}
                  >
                    Ver todos <span className={styles.arrow}>→</span>
                  </button>
                </div>
                <ProductCard produtos={relatedProducts} />
              </div>
            )}
          </div>
        ) : (
          // Cart with items
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className={styles.pageTitle}>MEU CARRINHO</h1>
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                  disabled={loading}
                >
                  Esvaziar carrinho
                </button>
              )}
            </div>

            <div className={styles.cartContent}>
              {/* Cart Main Section */}
              <div className={styles.cartMain}>
                {/* Cart Header - Desktop Only */}
                <div className={styles.cartHeader}>
                  <div className={styles.productHeader}>PRODUTO</div>
                  <div className={styles.quantityHeader}>QUANTIDADE</div>
                  <div className={styles.unitPriceHeader}>UNITÁRIO</div>
                  <div className={styles.totalHeader}>TOTAL</div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                    {error}
                    <button
                      onClick={() => setError(null)}
                      className="ml-2 text-red-800 hover:text-red-900"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Cart Items */}
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    product={{
                      id: item.produto.id,
                      nome: item.produto.nome,
                      cor: item.cor,
                      tamanho: item.tamanho,
                      precoOriginal: item.produto.precoOriginal,
                      precoAtual: item.produto.precoAtual,
                      imagemUrl: item.produto.imagemUrl,
                    }}
                    quantity={item.quantidade}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    onRemove={() => handleRemoveItem(item.id)}
                    disabled={actionLoading === item.id}
                  />
                ))}

                {/* Discount and Shipping side by side */}
                <div className={styles.discountAndShipping}>
                  <div className={styles.discountSection}>
                    <DiscountCode onApplyDiscount={handleApplyDiscount} />
                  </div>
                  <div className={styles.shippingSection}>
                    <ShippingCalculator onCalculateShipping={handleCalculateShipping} />
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className={styles.cartSummary}>
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className={styles.relatedProducts}>
                <div className={styles.relatedProductsHeader}>
                  <h2 className={styles.relatedProductsTitle}>Produtos Relacionados</h2>
                  <button
                    onClick={() => navigate('/produtos')}
                    className={styles.viewAllLink}
                  >
                    Ver todos <span className={styles.arrow}>→</span>
                  </button>
                </div>
                <ProductCard produtos={relatedProducts} />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;