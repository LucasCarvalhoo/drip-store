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
  
  // Mock cart data - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nome: 'Tênis Nike Revolution 6 Next Nature Masculino',
      cor: 'Vermelho / Branco',
      tamanho: '42',
      precoOriginal: 319,
      precoAtual: 219,
      quantidade: 1,
      imagemUrl: '/src/assets/products/tenis-nike.png', // Update with actual path
    },
  ]);
  
  const [discount, setDiscount] = useState(30); // Default discount amount
  const [shipping, setShipping] = useState(0); // Default shipping cost
  
  // Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.precoAtual * item.quantidade), 
    0
  );
  
  // Related products - in a real app, these would be fetched from an API
  const relatedProducts = [
    {
      id: 1,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png', // Update with actual path
    },
    {
      id: 2,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png', // Update with actual path
    },
    {
      id: 3,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 0,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png', // Update with actual path
    },
    {
      id: 4,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 0,
      categoria: 'Tênis',
      imagemUrl: '/src/assets/products/product-image-0.png', // Update with actual path
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
    // In a real app, you would validate the discount code with an API
    console.log(`Applying discount code: ${code}`);
    // For demo purposes, let's set a fixed discount
    setDiscount(30);
  };
  
  const handleCalculateShipping = (zipCode) => {
    // In a real app, you would calculate shipping with an API
    console.log(`Calculating shipping for: ${zipCode}`);
    // For demo purposes, let's set a fixed shipping cost
    setShipping(0);
  };
  
  const handleCheckout = () => {
    // In a real app, you would proceed to checkout
    console.log('Proceeding to checkout');
    navigate('/checkout'); // Navigate to checkout page
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className={styles.pageTitle}>MEU CARRINHO</h1>
        
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
          <div className={styles.cartLayout}>
            {/* Cart Items Section */}
            <div className={styles.cartItemsSection}>
              {/* Header - Desktop only */}
              <div className={styles.cartHeader}>
                <div className={styles.productHeaderCol}>PRODUTO</div>
                <div className={styles.quantityHeaderCol}>QUANTIDADE</div>
                <div className={styles.unitPriceHeaderCol}>UNITÁRIO</div>
                <div className={styles.totalHeaderCol}>TOTAL</div>
              </div>
              
              {/* Cart Items */}
              <div className={styles.cartItemsList}>
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id}
                    product={item}
                    quantity={item.quantidade}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </div>
              
              {/* Discount and Shipping - Mobile & Desktop */}
              <div className={styles.cartTools}>
                <DiscountCode onApplyDiscount={handleApplyDiscount} />
                <ShippingCalculator onCalculateShipping={handleCalculateShipping} />
              </div>
            </div>
            
            {/* Cart Summary Section */}
            <div className={styles.cartSummarySection}>
              <CartSummary 
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
        
        {/* Related Products Section */}
        {cartItems.length > 0 && (
          <div className={styles.relatedProductsSection}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
              <a href="/produtos" className="text-pink-600 text-sm flex items-center">
                Ver todos <span className="ml-1">→</span>
              </a>
            </div>
            <ProductCard produtos={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;