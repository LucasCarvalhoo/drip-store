// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (will connect to authService later)
    console.log('Login attempt with:', { email, password });
  };

  return (
    <AuthLayout>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Acesse sua conta</h1>
          <p className={styles.registerPrompt}>
            Novo cliente? Então registre-se <Link to="/cadastro" className={styles.registerLink}>aqui</Link>.
          </p>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Login</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu login ou email"
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
            
            <button type="submit" className={styles.loginButton}>
              Acessar Conta
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

export default Login;