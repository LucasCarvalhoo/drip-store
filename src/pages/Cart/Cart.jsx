// src/pages/Cart/Cart.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import DiscountCode from '../../components/DiscountCode/DiscountCode';
import ShippingCalculator from '../../components/ShippingCalculator/ShippingCalculator';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nome: 'Tênis Nike Revolution 6 Next Nature Masculino',
      cor: 'Vermelho / Branco',
      tamanho: '42',
      precoOriginal: 319,
      precoAtual: 219,
      quantidade: 1,
      imagemUrl: '/src/assets/products/tenis-nike.png',
    },
  ]);
  
  const [discount, setDiscount] = useState(30);
  const [shipping, setShipping] = useState(0);
  
  // Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.precoAtual * item.quantidade), 
    0
  );
  
  // Mock related products
  const relatedProducts = [
    {
      id: 1,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png',
    },
    {
      id: 2,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png',
    },
    {
      id: 3,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 0,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png',
    },
    {
      id: 4,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 0,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png',
    }
  ];
  
  // Event handlers
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantidade: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleApplyDiscount = (code) => {
    console.log(`Applying discount code: ${code}`);
    setDiscount(30);
  };
  
  const handleCalculateShipping = (zipCode) => {
    console.log(`Calculating shipping for: ${zipCode}`);
    setShipping(0);
  };
  
  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    navigate('/checkout');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Seu carrinho está vazio.</p>
            <button 
              onClick={() => navigate('/produtos')}
              className={styles.continueShoppingButton}
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <h1 className={styles.pageTitle}>MEU CARRINHO</h1>
            
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
                
                {/* Cart Items */}
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id}
                    product={{
                      ...item,
                      cor: item.cor,
                      tamanho: item.tamanho,
                      precoOriginal: item.precoOriginal,
                      precoAtual: item.precoAtual,
                      imagemUrl: item.imagemUrl,
                    }}
                    quantity={item.quantidade}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    onRemove={() => handleRemoveItem(item.id)}
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
            <div className={styles.relatedProducts}>
              <div className={styles.relatedProductsHeader}>
                <h2 className={styles.relatedProductsTitle}>Produtos Relacionados</h2>
                <a href="/produtos" className={styles.viewAllLink}>
                  Ver todos <span className={styles.arrow}>→</span>
                </a>
              </div>
              <ProductCard produtos={relatedProducts} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;