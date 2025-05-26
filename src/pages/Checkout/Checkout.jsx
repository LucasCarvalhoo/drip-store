// src/pages/Checkout/Checkout.jsx - VERSÃO ATUALIZADA COM INTEGRAÇÃO COMPLETA
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useUser } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';
import { getUserProfile } from '../../services/userService';
import { createOrder } from '../../services/orderService';
import { validateCoupon, applyCoupon } from '../../services/couponService';
import { getShippingCost } from '../../services/shippingService';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const { cartItems, cartSubtotal, cartId } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    // Shipping info
    address: '',
    neighborhood: '',
    city: '',
    zipcode: '',
    complement: '',
    // Payment info
    paymentMethod: 'credit',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Checkout states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Pricing states
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [shippingCalculated, setShippingCalculated] = useState(false);

  // Load user data and cart
  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        setLoading(true);
        setError('');

        // Check if user is logged in
        if (!user) {
          navigate('/login');
          return;
        }

        // Check if cart has items
        if (!cartItems || cartItems.length === 0) {
          navigate('/carrinho');
          return;
        }

        // Load user profile data
        let userProfile = profile;
        if (!userProfile) {
          userProfile = await getUserProfile(user.id);
        }

        // Pre-fill form with user data
        if (userProfile) {
          setFormData(prev => ({
            ...prev,
            fullName: userProfile.nome_completo || '',
            cpf: userProfile.cpf || '',
            email: user.email || '',
            phone: userProfile.celular || '',
            address: userProfile.endereco || '',
            neighborhood: userProfile.bairro || '',
            city: userProfile.cidade || '',
            zipcode: userProfile.cep || '',
            complement: userProfile.complemento || ''
          }));

          // Auto-calculate shipping if CEP is available
          if (userProfile.cep) {
            handleShippingCalculation(userProfile.cep);
          }
        } else {
          // Fill with user email at least
          setFormData(prev => ({
            ...prev,
            email: user.email || ''
          }));
        }

      } catch (err) {
        console.error('Error loading checkout data:', err);
        setError('Erro ao carregar dados do checkout. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, [user, profile, cartItems, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      alert('Digite um código de cupom.');
      return;
    }

    try {
      const result = await validateCoupon(couponCode, cartSubtotal);
      
      if (result.isValid) {
        setAppliedCoupon(result.coupon);
        setDiscount(result.coupon.discountValue);
        alert(result.message);
        
        // Recalculate shipping if free shipping coupon
        if (result.coupon.freeShipping && formData.zipcode) {
          const shippingResult = await getShippingCost(formData.zipcode, cartSubtotal, true);
          setShipping(shippingResult.cost);
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Erro ao aplicar cupom. Tente novamente.');
    }
  };

  // Handle shipping calculation
  const handleShippingCalculation = async (zipCode) => {
    if (!zipCode || zipCode.replace(/\D/g, '').length !== 8) {
      alert('Digite um CEP válido.');
      return;
    }

    try {
      const freeShipping = appliedCoupon?.freeShipping || false;
      const result = await getShippingCost(zipCode, cartSubtotal, freeShipping);
      
      setShipping(result.cost);
      setShippingCalculated(true);
      
      const message = result.isFree 
        ? `Frete grátis! Entrega em ${result.deliveryTime}`
        : `Frete: R$ ${result.cost.toFixed(2).replace('.', ',')} - Entrega em ${result.deliveryTime}`;
      
      alert(message);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      alert(error.message || 'Erro ao calcular frete.');
    }
  };

  // Calculate total
  const total = cartSubtotal + shipping - discount;

  // Form validation
  const validateForm = () => {
    const required = ['fullName', 'cpf', 'email', 'phone', 'address', 'neighborhood', 'city', 'zipcode'];
    
    for (const field of required) {
      if (!formData[field].trim()) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }
    }

    // Validate CPF
    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      throw new Error('CPF deve ter 11 dígitos.');
    }

    // Validate phone
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      throw new Error('Número de telefone inválido.');
    }

    // Validate CEP
    const cepNumbers = formData.zipcode.replace(/\D/g, '');
    if (cepNumbers.length !== 8) {
      throw new Error('CEP deve ter 8 dígitos.');
    }

    // Validate payment method
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardName.trim()) {
        throw new Error('Nome do cartão é obrigatório.');
      }
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\D/g, '').length < 13) {
        throw new Error('Número do cartão inválido.');
      }
      if (!formData.expiryDate.trim() || !formData.expiryDate.includes('/')) {
        throw new Error('Data de validade inválida.');
      }
      if (!formData.cvv.trim() || formData.cvv.length < 3) {
        throw new Error('CVV inválido.');
      }
    }

    // Check if shipping was calculated
    if (!shippingCalculated) {
      throw new Error('Por favor, calcule o frete antes de finalizar.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');

      // Validate form
      validateForm();

      // Prepare order data
      const orderData = {
        userId: user.id,
        subtotal: cartSubtotal,
        shipping: shipping,
        discount: discount,
        total: total,
        paymentMethod: formData.paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Boleto Bancário',
        installments: formData.paymentMethod === 'credit' ? 10 : 1,
        shippingAddress: {
          endereco: formData.address,
          bairro: formData.neighborhood,
          cidade: formData.city,
          estado: 'CE', // Default - could be made dynamic
          cep: formData.zipcode.replace(/\D/g, ''),
          complemento: formData.complement
        },
        items: cartItems.map(item => ({
          produto_id: item.produto.id,
          variacao_id: null, // Simplified for now
          quantidade: item.quantidade,
          preco_unitario: item.produto.precoAtual
        }))
      };

      console.log('Creating order with data:', orderData);

      // Create order
      const order = await createOrder(orderData);
      console.log('Order created successfully:', order);

      // Apply coupon if used
      if (appliedCoupon) {
        await applyCoupon(appliedCoupon.id);
      }

      // Clear cart (optional - might want to keep until payment confirmed)
      // await clearCart(cartId);

      // Show success and redirect
      alert(`✅ Pedido realizado com sucesso!\n\nNúmero do pedido: ${order.codigo}\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`);
      
      // Navigate to success page
      navigate('/compra-realizada', { 
        state: { 
          orderCode: order.codigo,
          orderData: orderData
        }
      });

    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Erro ao processar pedido. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="bg-gray-50 py-8 px-4">
          <div className="container mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-md p-6 space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-48"></div>
                    <div className="space-y-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-md p-6">
                    <div className="h-64 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className={styles.pageTitle}>Finalizar Compra</h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-md p-6 space-y-8">
                
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nome Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CPF <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Telefone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Informações de Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Endereço <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bairro <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Cidade <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CEP <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required
                          disabled={submitting}
                        />
                        <button
                          type="button"
                          onClick={() => handleShippingCalculation(formData.zipcode)}
                          className="px-4 py-2 bg-pink-600 text-white rounded-r-md hover:bg-pink-700 disabled:bg-gray-400"
                          disabled={submitting}
                        >
                          Calcular Frete
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complement"
                        value={formData.complement}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Cupom de Desconto</h2>
                  <div className="flex max-w-md">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite o código do cupom"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      disabled={submitting}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-pink-600 text-white rounded-r-md hover:bg-pink-700 disabled:bg-gray-400"
                      disabled={submitting}
                    >
                      Aplicar
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 text-sm text-green-600">
                      ✅ Cupom "{appliedCoupon.code}" aplicado - Desconto: R$ {discount.toFixed(2).replace('.', ',')}
                    </div>
                  )}
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Informações de Pagamento</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Forma de Pagamento</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit"
                          checked={formData.paymentMethod === 'credit'}
                          onChange={handleInputChange}
                          className="mr-2"
                          disabled={submitting}
                        />
                        Cartão de Crédito
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bankSlip"
                          checked={formData.paymentMethod === 'bankSlip'}
                          onChange={handleInputChange}
                          className="mr-2"
                          disabled={submitting}
                        />
                        Boleto Bancário
                      </label>
                    </div>
                  </div>

                  {/* Credit Card Fields */}
                  {formData.paymentMethod === 'credit' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Nome do Cartão <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required={formData.paymentMethod === 'credit'}
                          disabled={submitting}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Número do Cartão <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required={formData.paymentMethod === 'credit'}
                          disabled={submitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Data de Validade <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required={formData.paymentMethod === 'credit'}
                          disabled={submitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required={formData.paymentMethod === 'credit'}
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button - Mobile */}
                <div className="md:hidden">
                  <button
                    type="submit"
                    disabled={submitting || cartItems.length === 0}
                    className="w-full bg-yellow-500 text-white py-3 px-6 rounded-md font-medium hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processando...' : 'Realizar Pagamento'}
                  </button>
                </div>

              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>

                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.slice(0, 3).map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img
                          src={item.produto.imagemUrl}
                          alt={item.produto.nome}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '../images/products/produc-image-0.png';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.produto.nome}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{item.quantidade}x</span>
                          <span className="text-sm font-medium">
                            R$ {(item.produto.precoAtual * item.quantidade).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {cartItems.length > 3 && (
                    <div className="text-sm text-gray-500 text-center">
                      +{cartItems.length - 3} outros itens
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                {/* Pricing Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Frete:</span>
                    <span>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto:</span>
                      <span>-R$ {discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <hr className="my-2" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-pink-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-right">
                    ou 10x de R$ {(total / 10).toFixed(2).replace('.', ',')} sem juros
                  </div>
                </div>

                {/* Submit Button - Desktop */}
                <div className="hidden md:block mt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || cartItems.length === 0}
                    className="w-full bg-yellow-500 text-white py-3 px-6 rounded-md font-medium hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processando...' : 'Realizar Pagamento'}
                  </button>
                </div>

                {/* Payment Info */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  🔒 Suas informações estão seguras e protegidas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;