// src/pages/UserInfo/UserInfo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import UserInfoSection from '../../components/UserInfoSection/UserInfoSection';
import UserInfoItem from '../../components/UserInfoItem/UserInfoItem';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  // In a real app, this would come from an API call, context, or state management
  const userData = {
    personal: {
      name: 'Francisco Antonio Pereira',
      cpf: '123485913-35',
      email: 'francisco@gmail.com',
      phone: '(85) 5555-5555'
    },
    delivery: {
      address: 'Rua João Pessoa, 333',
      neighborhood: 'Centro',
      city: 'Fortaleza, Ceará',
      zipCode: '433-8800'
    }
  };

  // Edit button component
  const EditButton = () => (
    <Link to="/editar-informacoes" className={styles.editButton}>
      Editar
    </Link>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className={styles.userInfoPage}>
          {/* Account Sidebar */}
          <div className={styles.sidebarContainer}>
            <AccountSidebar />
          </div>
          
          {/* User Information Content */}
          <div className={styles.contentContainer}>
            <h1 className={styles.pageTitle}>Minhas Informações</h1>
            
            {/* Personal Information Section */}
            <UserInfoSection 
              title="Informações Pessoais" 
              actionButton={<EditButton />}
            >
              <UserInfoItem label="Nome" value={userData.personal.name} />
              <UserInfoItem label="CPF" value={userData.personal.cpf} />
              <UserInfoItem label="Email" value={userData.personal.email} />
              <UserInfoItem label="Celular" value={userData.personal.phone} />
            </UserInfoSection>
            
            {/* Delivery Information Section */}
            <UserInfoSection 
              title="Informações de Entrega"
            >
              <UserInfoItem label="Endereço" value={userData.delivery.address} />
              <UserInfoItem label="Bairro" value={userData.delivery.neighborhood} />
              <UserInfoItem label="Cidade" value={userData.delivery.city} />
              <UserInfoItem label="CEP" value={userData.delivery.zipCode} />
            </UserInfoSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;