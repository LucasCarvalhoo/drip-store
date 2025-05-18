// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (will connect to authService later)
    console.log('Registration attempt with:', { email });
  };

  return (
    <AuthLayout>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <h1 className={styles.registerTitle}>Crie sua conta</h1>
          <p className={styles.loginPrompt}>
            Já possui uma conta? Entre <Link to="/login" className={styles.loginLink}>aqui</Link>.
          </p>
          
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu email"
                className={styles.input}
                required
              />
            </div>
            
            <button type="submit" className={styles.registerButton}>
              Criar Conta
            </button>
          </form>
          
          <div className={styles.socialLogin}>
            <p className={styles.socialText}>Ou faça login com</p>
            <div className={styles.socialButtons}>
              <button className={styles.googleButton}>
                <img src="/src/assets/icons/gmail.png" alt="Gmail" />
              </button>
              <button className={styles.facebookButton}>
                <img src="/src/assets/icons/facebook.png" alt="Facebook" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product image - only shown on desktop */}
        <div className={styles.productImage}>
          <img src="../images/login-shoes.png" alt="Tênis" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;