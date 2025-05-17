// src/pages/Checkout/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();

  // Estado para controlar o método de pagamento selecionado
  const [paymentMethod, setPaymentMethod] = useState('credit');

  // Mock de dados do produto
  const product = {
    id: 1,
    name: 'Tênis Nike Revolution 6 Next Nature Masculino',
    price: 219.00,
    image: '../images/products/produc-image-7.png'
  };

  // Valores do pedido
  const orderSummary = {
    subtotal: 219.00,
    shipping: 0.00,
    discount: 30.00,
    total: 219.00
  };

  // Manipuladores de eventos
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado!');
    // Aqui você faria a integração com o backend para processar o pagamento
    // e depois redirecionaria para uma página de sucesso
    alert('Compra finalizada com sucesso!');
    navigate('/');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className={styles.pageTitle}>Finalizar Compra</h1>

          <div className={styles.checkoutContainer}>
            {/* Formulário de Checkout */}
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                {/* Informações Pessoais */}
                <div className={styles.sectionContainer}>
                  <h2 className={styles.sectionTitle}>Informações Pessoais</h2>

                  <div className={styles.inputGroup}>
                    <label htmlFor="fullName" className={styles.inputLabel}>
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Insira seu nome"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="cpf" className={styles.inputLabel}>
                      CPF <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      placeholder="Insira seu CPF"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.inputLabel}>
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Insira seu email"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.inputLabel}>
                      Celular <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Insira seu celular"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                {/* Informações de Entrega */}
                <div className={styles.sectionContainer}>
                  <h2 className={styles.sectionTitle}>Informações de Entrega</h2>

                  <div className={styles.inputGroup}>
                    <label htmlFor="address" className={styles.inputLabel}>
                      Endereço <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Insira seu endereço"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="neighborhood" className={styles.inputLabel}>
                      Bairro <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="neighborhood"
                      placeholder="Insira seu bairro"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="city" className={styles.inputLabel}>
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Insira sua cidade"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="zipcode" className={styles.inputLabel}>
                      CEP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      placeholder="Insira seu CEP"
                      className={styles.input}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="complement" className={styles.inputLabel}>
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complement"
                      placeholder="Insira complemento"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Informações de Pagamento */}
                <div className={styles.sectionContainer}>
                  <h2 className={styles.sectionTitle}>Informações de Pagamento</h2>

                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>Forma de Pagamento</label>
                    <div className="flex items-center space-x-6 mt-2">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={() => handlePaymentMethodChange('credit')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border rounded-full ${paymentMethod === 'credit' ? 'border-pink-600' : 'border-gray-300'}`}>
                            {paymentMethod === 'credit' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-700">Cartão de Crédito</span>
                      </label>

                      <label className="flex items-center cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bankSlip"
                            checked={paymentMethod === 'bankSlip'}
                            onChange={() => handlePaymentMethodChange('bankSlip')}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border rounded-full ${paymentMethod === 'bankSlip' ? 'border-pink-600' : 'border-gray-300'}`}>
                            {paymentMethod === 'bankSlip' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-700">Boleto Bancário</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'credit' && (
                    <>
                      <div className={styles.inputGroup}>
                        <label htmlFor="cardName" className={styles.inputLabel}>
                          Nome do Cartão <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          placeholder="Insira o nome do Cartão"
                          className={styles.input}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={styles.inputGroup}>
                          <label htmlFor="cardNumber" className={styles.inputLabel}>
                            Data e Número do Cartão <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="Insira número do Cartão"
                            className={styles.input}
                            required
                          />
                        </div>

                        <div className={styles.inputGroup}>
                          <label htmlFor="expiryDate" className={styles.inputLabel}>
                            Data de validade do Cartão <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="Insira a validade do Cartão"
                            className={styles.input}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="cvv" className={styles.inputLabel}>
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="CVV"
                          className={styles.input}
                          style={{ maxWidth: '120px' }}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Seção Finalizar Compra */}
                <div className={styles.finalizarCompraContainer}>
                  <h2 className={styles.sectionTitle}>Finalizar Compra</h2>

                  <div className={styles.divider}></div>

                  {/* Total */}
                  <div className={styles.totalContainerMobile}>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total</span>
                      <div className="text-right">
                        <span className="block text-xl font-bold text-pink-600">R$ {orderSummary.total.toFixed(2)}</span>
                        <span className="block text-xs text-gray-500">
                          ou 10x de R$ {(orderSummary.total / 10).toFixed(2)} sem juros
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Finalizar Compra */}
                  <div className={styles.actionContainer}>
                    <button type="submit" className={styles.submitButton}>
                      Realizar Pagamento
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className={styles.summaryContainer}>
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>RESUMO</h2>

                {/* Item do pedido */}
                <div className={styles.productItem}>
                  <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                  </div>
                </div>

                <div className={styles.divider}></div>

                {/* Detalhes do valor */}
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal:</span>
                    <span>R$ {orderSummary.subtotal.toFixed(2)}</span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span>Frete:</span>
                    <span>R$ {orderSummary.shipping.toFixed(2)}</span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span>Desconto:</span>
                    <span>R$ {orderSummary.discount.toFixed(2)}</span>
                  </div>
                </div>

                <div className={styles.divider}></div>

                {/* Total */}
                <div className={styles.totalContainer}>
                  <div className="flex justify-between font-medium">
                    <span className={styles.totalPrice}>Total</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-semibold">R$ {orderSummary.total.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">
                        ou 10x de R$ {(orderSummary.total / 10).toFixed(2)} sem juros
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de Realizar Pagamento (apenas no desktop) */}
                <div className="hidden md:block mt-6">
                  <button
                    type="button"
                    className={styles.submitButton}
                    onClick={() => document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
                    Realizar Pagamento
                  </button>
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