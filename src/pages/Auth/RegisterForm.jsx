// src/pages/Auth/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import styles from './RegisterForm.module.css';
import { signUp } from '../../services/authService';
import { useUser } from '../../contexts/UserContext'; // Corrigido para o caminho correto

const RegisterForm = () => {
    const navigate = useNavigate();
    // Obtenha updateUserAndFetchProfile em vez de apenas setUser
    const { updateUserAndFetchProfile } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Renomeado de loading

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        celular: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: 'CE',
        cep: '',
        complemento: '',
        receberOfertas: true,
    });

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('registerEmail');
        const storedPassword = sessionStorage.getItem('registerPassword');

        if (!storedEmail || !storedPassword) {
            navigate('/cadastro');
            return;
        }
        setEmail(storedEmail);
        setPassword(storedPassword);
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // ... (suas funções formatCPF, formatPhone, formatCEP, handleSpecialInputs, validateEmail) ...
    const formatCPF = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 3) return numericValue;
        if (numericValue.length <= 6) return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        if (numericValue.length <= 9) return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
        return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
    };
    const formatPhone = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 2) return numericValue.length ? `(${numericValue}` : '';
        if (numericValue.length <= 7) return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
        return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
    };
    const formatCEP = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 5) return numericValue;
        return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    };
    const handleSpecialInputs = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'cpf') formattedValue = formatCPF(value);
        else if (name === 'celular') formattedValue = formatPhone(value);
        else if (name === 'cep') formattedValue = formatCEP(value);
        setFormData({ ...formData, [name]: formattedValue });
    };
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // ... (suas validações existentes) ...
        if (!validateEmail(email)) { setError('Por favor, insira um email válido.'); return; }
        const requiredFields = ['nome', 'cpf', 'celular', 'endereco', 'bairro', 'cidade', 'estado', 'cep'];
        for (const field of requiredFields) { if (!formData[field] || !formData[field].toString().trim()) { setError(`Por favor, preencha todos os campos obrigatórios.`); return; } }
        const cpfNumbers = formData.cpf.replace(/\D/g, '');
        if (cpfNumbers.length !== 11) { setError('CPF deve ter 11 dígitos. Formato: 000.000.000-00'); return; }
        const phoneNumbers = formData.celular.replace(/\D/g, '');
        if (phoneNumbers.length < 10 || phoneNumbers.length > 11) { setError('Número de celular inválido.'); return; }
        const cepNumbers = formData.cep.replace(/\D/g, '');
        if (cepNumbers.length !== 8) { setError('CEP deve ter 8 dígitos. Formato: 00000-000'); return; }


        try {
            setIsSubmitting(true);
            const data = await signUp(email, password, formData); // data aqui é { user, session }

            if (data && data.user) {
                // Use a nova função do contexto aqui!
                await updateUserAndFetchProfile(data.user);
            }

            sessionStorage.removeItem('registerEmail');
            sessionStorage.removeItem('registerPassword');
            alert('Conta criada com sucesso! Verifique seu email para confirmar a conta.');
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ... restante do seu formulário JSX ...
    return (
        <AuthLayout>
            <div className={styles.registerFormContainer}>
                <div className={styles.registerFormCard}>
                    <h1 className={styles.title}>Criar Conta</h1>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Seção de Informações Pessoais */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                            <div className={styles.separator}></div>
                            {/* Nome Completo */}
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.label}>Nome Completo <span className={styles.required}>*</span></label>
                                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Insira seu nome" className={styles.input} required disabled={isSubmitting}/>
                            </div>
                            {/* CPF */}
                            <div className={styles.formGroup}>
                                <label htmlFor="cpf" className={styles.label}>CPF <span className={styles.required}>*</span></label>
                                <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleSpecialInputs} placeholder="Insira seu CPF" className={styles.input} maxLength="14" required disabled={isSubmitting}/>
                            </div>
                            {/* Email */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>E-mail <span className={styles.required}>*</span></label>
                                <input type="email" id="email" name="email" value={email} className={styles.input} disabled={true}/>
                            </div>
                            {/* Celular */}
                            <div className={styles.formGroup}>
                                <label htmlFor="celular" className={styles.label}>Celular <span className={styles.required}>*</span></label>
                                <input type="text" id="celular" name="celular" value={formData.celular} onChange={handleSpecialInputs} placeholder="Insira seu celular" className={styles.input} maxLength="16" required disabled={isSubmitting}/>
                            </div>
                        </div>

                        {/* Seção de Informações de Entrega */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Informações de Entrega</h2>
                            <div className={styles.separator}></div>
                            {/* Endereço */}
                            <div className={styles.formGroup}>
                                <label htmlFor="endereco" className={styles.label}>Endereço <span className={styles.required}>*</span></label>
                                <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Insira seu endereço" className={styles.input} required disabled={isSubmitting}/>
                            </div>
                            {/* Bairro */}
                            <div className={styles.formGroup}>
                                <label htmlFor="bairro" className={styles.label}>Bairro <span className={styles.required}>*</span></label>
                                <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Insira seu bairro" className={styles.input} required disabled={isSubmitting}/>
                            </div>
                            {/* Cidade */}
                            <div className={styles.formGroup}>
                                <label htmlFor="cidade" className={styles.label}>Cidade <span className={styles.required}>*</span></label>
                                <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Insira sua cidade" className={styles.input} required disabled={isSubmitting}/>
                            </div>
                            {/* Estado */}
                            <div className={styles.formGroup}>
                                <label htmlFor="estado" className={styles.label}>Estado <span className={styles.required}>*</span></label>
                                <select id="estado" name="estado" value={formData.estado} onChange={handleChange} className={styles.input} required disabled={isSubmitting}>
                                    <option value="">Selecione</option>
                                    <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option><option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                                </select>
                            </div>
                            {/* CEP */}
                            <div className={styles.formGroup}>
                                <label htmlFor="cep" className={styles.label}>CEP <span className={styles.required}>*</span></label>
                                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleSpecialInputs} placeholder="Insira seu CEP" className={styles.input} maxLength="9" required disabled={isSubmitting}/>
                            </div>
                            {/* Complemento */}
                            <div className={styles.formGroup}>
                                <label htmlFor="complemento" className={styles.label}>Complemento</label>
                                <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Insira complemento" className={styles.input} disabled={isSubmitting}/>
                            </div>
                        </div>
                        
                        {/* Preferências de Marketing */}
                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxWrapper}>
                                <input type="checkbox" id="receberOfertas" name="receberOfertas" checked={formData.receberOfertas} onChange={handleChange} className={styles.checkbox} disabled={isSubmitting}/>
                            </div>
                            <label htmlFor="receberOfertas" className={styles.checkboxLabel}>
                                Quero receber por email ofertas e novidades das lojas da Digital Store. A frequência de envios pode variar de acordo com a interação do cliente.
                            </label>
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                        </button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterForm;