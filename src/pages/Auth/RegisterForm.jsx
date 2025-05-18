// src/pages/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './RegisterForm.module.css';
import { Link } from 'react-router-dom';

const RegisterForm = () => {

    // Form state
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        celular: '',
        endereco: '',
        bairro: '',
        cidade: '',
        cep: '',
        complemento: '',
        receberOfertas: true,
        senha: '',
        confirmarSenha: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Format CPF input: 000.000.000-00
    const formatCPF = (value) => {
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length <= 3) {
            return numericValue;
        } else if (numericValue.length <= 6) {
            return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        } else if (numericValue.length <= 9) {
            return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
        } else {
            return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
        }
    };

    // Format phone number: (00) 00000-0000
    const formatPhone = (value) => {
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length <= 2) {
            return numericValue.length ? `(${numericValue}` : '';
        } else if (numericValue.length <= 7) {
            return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
        } else {
            return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
        }
    };

    // Format CEP: 00000-000
    const formatCEP = (value) => {
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length <= 5) {
            return numericValue;
        } else {
            return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
        }
    };

    // Handle special inputs with formatting
    const handleSpecialInputs = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cpf') {
            formattedValue = formatCPF(value);
        } else if (name === 'celular') {
            formattedValue = formatPhone(value);
        } else if (name === 'cep') {
            formattedValue = formatCEP(value);
        }

        setFormData({
            ...formData,
            [name]: formattedValue,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        // Handle registration (will connect to authService later)
        console.log('Form submitted with:', formData);

        // In a real app, you would:
        // 1. Send data to your backend/auth service
        // 2. Navigate to a success page or login page
        // navigate('/registration-success');
    };

    return (
        <AuthLayout>
            <div className={styles.registerFormContainer}>
                <div className={styles.registerFormCard}>
                    <h1 className={styles.title}>Criar Conta</h1>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Personal Information Section */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                            <div className={styles.separator}></div>

                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome Completo <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Insira seu nome"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cpf" className={styles.label}>
                                    CPF <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleSpecialInputs}
                                    placeholder="Insira seu CPF"
                                    className={styles.input}
                                    maxLength="14"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    E-mail <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Insira seu email"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="celular" className={styles.label}>
                                    Celular <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleSpecialInputs}
                                    placeholder="Insira seu celular"
                                    className={styles.input}
                                    maxLength="16"
                                    required
                                />
                            </div>
                        </div>

                        {/* Delivery Information Section */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Informações de Entrega</h2>
                            <div className={styles.separator}></div>

                            <div className={styles.formGroup}>
                                <label htmlFor="endereco" className={styles.label}>
                                    Endereço <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    placeholder="Insira seu endereço"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="bairro" className={styles.label}>
                                    Bairro <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="bairro"
                                    name="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    placeholder="Insira seu bairro"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cidade" className={styles.label}>
                                    Cidade <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="cidade"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    placeholder="Insira sua cidade"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cep" className={styles.label}>
                                    CEP <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    value={formData.cep}
                                    onChange={handleSpecialInputs}
                                    placeholder="Insira seu CEP"
                                    className={styles.input}
                                    maxLength="9"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="complemento" className={styles.label}>
                                    Complemento
                                </label>
                                <input
                                    type="text"
                                    id="complemento"
                                    name="complemento"
                                    value={formData.complemento}
                                    onChange={handleChange}
                                    placeholder="Insira complemento"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Marketing Preferences */}
                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxWrapper}>
                                <input
                                    type="checkbox"
                                    id="receberOfertas"
                                    name="receberOfertas"
                                    checked={formData.receberOfertas}
                                    onChange={handleChange}
                                    className={styles.checkbox}
                                />
                            </div>
                            <label htmlFor="receberOfertas" className={styles.checkboxLabel}>
                                Quero receber por email ofertas e novidades das lojas da Digital Store. A frequência de envios pode variar de acordo com a interação do cliente.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className={styles.submitButton}>
                            <Link to='/login' className={styles.submitButtonLink}>
                                Criar Conta
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterForm;