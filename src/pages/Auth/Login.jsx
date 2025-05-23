// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './Login.module.css';
import { signIn } from '../../services/authService';
import { useUser } from '../../contexts/UserContext'; // Corrigido para o caminho correto do UserContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Renomeado de loading para evitar conflito
  
  const navigate = useNavigate();
  // Obtenha updateUserAndFetchProfile em vez de apenas setUser
  const { updateUserAndFetchProfile } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const data = await signIn(email, password); // data aqui é { user, session }
      
      if (data && data.user) {
        // Use a nova função do contexto aqui!
        await updateUserAndFetchProfile(data.user);
        navigate('/');
      } else {
        // Caso signIn retorne sem usuário (embora authService.signIn deva lançar erro antes)
        setError('Ocorreu um erro inesperado durante o login.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message === 'Invalid login credentials') {
        setError('Email ou senha incorretos. Por favor, tente novamente.');
      } else {
        setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Acesse sua conta</h1>
          <p className={styles.registerPrompt}>
            Novo cliente? Então registre-se <Link to="/cadastro" className={styles.registerLink}>aqui</Link>.
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu email"
                className={styles.input}
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            
            <div className={styles.forgotPassword}>
              <Link to="/esqueci-senha">Esqueci minha senha</Link>
            </div>
            
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Aguarde...' : 'Acessar Conta'}
            </button>
          </form>
          
          <div className={styles.socialLogin}>
            <p className={styles.socialText}>Ou faça login com</p>
            <div className={styles.socialButtons}>
              <button className={styles.googleButton} disabled={isSubmitting}>
                <img src="/src/assets/icons/gmail.png" alt="Gmail" />
              </button>
              <button className={styles.facebookButton} disabled={isSubmitting}>
                <img src="/src/assets/icons/facebook.png" alt="Facebook" />
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.productImage}>
          <img src="../images/login-shoes.png" alt="Tênis" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;