// src/pages/PaymentMethods/PaymentMethods.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import styles from './PaymentMethods.module.css';

const PaymentMethods = () => {
  // Mock data for saved payment methods
  const savedCards = [
    {
      id: 1,
      type: 'credit',
      brand: 'Visa',
      lastDigits: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      brand: 'Mastercard',
      lastDigits: '5678',
      expiryDate: '08/26',
      isDefault: false
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className={styles.pageContainer}>
          {/* Account Sidebar */}
          <div className={styles.sidebarContainer}>
            <AccountSidebar />
          </div>
          
          {/* Payment Methods Content */}
          <div className={styles.contentContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.pageTitle}>Métodos de Pagamento</h1>
              <Link to="/adicionar-cartao" className={styles.addButton}>
                + Adicionar novo cartão
              </Link>
            </div>
            
            <div className={styles.cardsSection}>
              {savedCards.length > 0 ? (
                <div className={styles.cardsList}>
                  {savedCards.map((card) => (
                    <div key={card.id} className={styles.cardItem}>
                      <div className={styles.cardDetails}>
                        <div className={styles.cardIcon}>
                          {card.brand === 'Visa' ? (
                            <div className={styles.visaIcon}>VISA</div>
                          ) : (
                            <div className={styles.mastercardIcon}>MC</div>
                          )}
                        </div>
                        <div className={styles.cardInfo}>
                          <p className={styles.cardNumber}>
                            •••• •••• •••• {card.lastDigits}
                          </p>
                          <p className={styles.cardExpiry}>
                            Válido até {card.expiryDate}
                          </p>
                          {card.isDefault && (
                            <span className={styles.defaultBadge}>Padrão</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.cardActions}>
                        {!card.isDefault && (
                          <button className={styles.setDefaultButton}>
                            Definir como padrão
                          </button>
                        )}
                        <button className={styles.removeButton}>
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Você ainda não possui cartões salvos.</p>
                  <p className={styles.emptyStateSubtext}>
                    Adicione um cartão para finalizar suas compras mais rapidamente.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethods;