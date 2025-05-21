// src/pages/OrderSuccess/OrderSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './OrderSuccess.module.css';

// Importação de componentes
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const OrderSuccess = () => {
  // Mock data - em um app real isso viria do estado global ou API
  const orderData = {
    personalInfo: {
      name: "Francisco Antonio Pereira",
      cpf: "123456789-35",
      email: "francisco@gmail.com",
      phone: "(85) 5555-5555"
    },
    deliveryInfo: {
      address: "Rua João Pessoa, 333",
      district: "Centro",
      city: "Fortaleza, Ceará",
      zipCode: "433-8800"
    },
    paymentInfo: {
      cardHolder: "FRANCISCO A P",
      cardLastDigits: "2020"
    },
    orderSummary: {
      products: [
        {
          id: 1,
          name: "Tênis Nike Revolution 6 Next Nature Masculino",
          price: 219.00,
          image: "/images/products/produc-image-7.png"
        }
      ],
      total: 219.00
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Conteúdo da página */}
          <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto p-6 md:p-8">
            
            {/* Ícone e título */}
            <div className="text-center mb-8">
              {/* Usando emoji temporariamente - idealmente usar um SVG */}
              <div className="text-4xl mb-4">🎉</div>
              <h1 className="text-xl md:text-2xl font-medium">
                Compra Realizada com sucesso!
              </h1>
            </div>
            
            {/* Linha divisória */}
            <div className="border-t border-gray-200 mb-6"></div>
            
            {/* Informações Pessoais */}
            <section className="mb-6">
              <h2 className="text-base font-medium mb-3">Informações Pessoais</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm text-gray-500 w-14">Nome:</span>
                  <p className="text-sm">{orderData.personalInfo.name}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-14">CPF:</span>
                  <p className="text-sm">{orderData.personalInfo.cpf}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-14">Email:</span>
                  <p className="text-sm">{orderData.personalInfo.email}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-14">Celular:</span>
                  <p className="text-sm">{orderData.personalInfo.phone}</p>
                </div>
              </div>
            </section>
            
            {/* Linha divisória */}
            <div className="border-t border-gray-200 mb-6"></div>
            
            {/* Informações de Entrega */}
            <section className="mb-6">
              <h2 className="text-base font-medium mb-3">Informações de Entrega</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm text-gray-500 w-20">Endereço:</span>
                  <p className="text-sm">{orderData.deliveryInfo.address}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-20">Bairro:</span>
                  <p className="text-sm">{orderData.deliveryInfo.district}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-20">Cidade:</span>
                  <p className="text-sm">{orderData.deliveryInfo.city}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-20">CEP:</span>
                  <p className="text-sm">{orderData.deliveryInfo.zipCode}</p>
                </div>
              </div>
            </section>
            
            {/* Linha divisória */}
            <div className="border-t border-gray-200 mb-6"></div>
            
            {/* Informações de Pagamento */}
            <section className="mb-6">
              <h2 className="text-base font-medium mb-3">Informações de Pagamento</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm text-gray-500 w-32">Titular do Cartão:</span>
                  <p className="text-sm">{orderData.paymentInfo.cardHolder}</p>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-32">Final:</span>
                  <p className="text-sm">************{orderData.paymentInfo.cardLastDigits}</p>
                </div>
              </div>
            </section>
            
            {/* Linha divisória */}
            <div className="border-t border-gray-200 mb-6"></div>
            
            {/* Resumo da compra */}
            <section className="mb-6">
              <h2 className="text-base font-medium mb-3">Resumo da compra</h2>
              <div className="bg-gray-100 p-3 rounded-md">
                {orderData.orderSummary.products.map(product => (
                  <div key={product.id} className="flex items-center">
                    <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center p-2 mr-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/src/assets/icons/icon-category-sneakers.svg';
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{product.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Total - com fundo amarelo claro */}
            <section className="mb-8 bg-amber-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium">Total</h2>
                <p className="text-black font-medium">R$ 219,00</p>
              </div>
              <p className="text-xs text-gray-500 text-right">ou 10x de R$ 21,90 sem juros</p>
            </section>
            
            {/* Botões */}
            <div className="space-y-3">
              <button 
                className="w-full text-gray-700 text-sm py-2 text-center underline hover:text-gray-900 transition-colors"
                onClick={() => window.print()}
              >
                Imprimir Recibo
              </button>
              
              <Link 
                to="/" 
                className="block w-full bg-yellow-500 text-center text-white font-medium py-3 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Voltar para Home
              </Link>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;