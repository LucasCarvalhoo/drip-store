// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './Register.module.css';

/**
 * Register Component - First step of the registration process
 * Collects email and password, then stores in localStorage/sessionStorage
 * before redirecting to the registration form
 */
const Register = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [error, setError] = useState('');
  const [isStoring, setIsStoring] = useState(false);
  
  /**
   * Directly store data and navigate without using React Router
   * This bypasses potential issues with form submission and Router navigation
   */
  const storeDataAndNavigate = () => {
    // Basic validation
    if (!email.trim()) {
      setError('Por favor, insira um email válido.');
      return false;
    }
    
    if (!password.trim()) {
      setError('Por favor, insira uma senha.');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }
    
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return false;
    }
    
    try {
      console.log('Storing data in localStorage and sessionStorage');
      
      // First clear any existing data
      localStorage.removeItem('registerEmail');
      localStorage.removeItem('registerPassword');
      sessionStorage.removeItem('registerEmail');
      sessionStorage.removeItem('registerPassword');
      
      // Store in localStorage
      localStorage.setItem('registerEmail', email);
      localStorage.setItem('registerPassword', password);
      
      // Also store in sessionStorage as a backup
      sessionStorage.setItem('registerEmail', email);
      sessionStorage.setItem('registerPassword', password);
      
      // Verify data was stored (debug)
      const localEmail = localStorage.getItem('registerEmail');
      const sessionEmail = sessionStorage.getItem('registerEmail');
      
      console.log('Stored in localStorage:', localEmail);
      console.log('Stored in sessionStorage:', sessionEmail);
      
      if (!localEmail && !sessionEmail) {
        throw new Error('Failed to store data');
      }
      
      return true;
    } catch (err) {
      console.error('Error storing registration data:', err);
      setError('Houve um erro ao salvar seus dados. Por favor, tente novamente.');
      return false;
    }
  };
  
  /**
   * Handle the button click event directly (not form submission)
   * This gives us more control over the flow
   */
  const handleContinueClick = () => {
    setError('');
    setIsStoring(true);
    
    // Try to store data
    if (storeDataAndNavigate()) {
      // Success - navigate to form page using direct browser navigation
      console.log('Navigating to registration form...');
      window.location.href = '/cadastro/formulario';
    } else {
      // Error - already displayed by storeDataAndNavigate
      setIsStoring(false);
    }
  };
  
  /**
   * Handle form submission
   * This is a fallback method in case the button click handler doesn't work
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    handleContinueClick();
  };
  
  return (
    <AuthLayout>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <h1 className={styles.registerTitle}>Crie sua conta</h1>
          <p className={styles.loginPrompt}>
            Já possui uma conta? Entre <Link to="/login" className={styles.loginLink}>aqui</Link>.
          </p>

          {/* Error display */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Storage debug info */}
          <div className="text-xs text-gray-500 mb-4">
            localStorage: {localStorage.getItem('registerEmail') || 'empty'}<br/>
            sessionStorage: {sessionStorage.getItem('registerEmail') || 'empty'}
          </div>

          {/* Registration form */}
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
                disabled={isStoring}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Senha *</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
                className={styles.input}
                required
                disabled={isStoring}
                minLength="8"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirme sua senha *</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className={styles.input}
                required
                disabled={isStoring}
              />
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              className={styles.registerButton}
              disabled={isStoring}
            >
              {isStoring ? 'Aguarde...' : 'Continuar'}
            </button>
          </form>
          
          {/* Direct button (outside form) as fallback */}
          <button 
            onClick={handleContinueClick}
            className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            disabled={isStoring}
          >
            Continuar (Método alternativo)
          </button>

          <div className={styles.socialLogin}>
            <p className={styles.socialText}>Ou faça login com</p>
            <div className={styles.socialButtons}>
              <button className={styles.googleButton} disabled={isStoring}>
                <img src="/src/assets/icons/gmail.png" alt="Gmail" />
              </button>
              <button className={styles.facebookButton} disabled={isStoring}>
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