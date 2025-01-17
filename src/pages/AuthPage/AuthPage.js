// src/pages/AuthPage/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './AuthPage.css';

function AuthPage() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError(''); // Limpa erros quando o usuário começa a digitar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLoginMode) {
                // Processo de login
                const { user } = await authService.login({
                    email: formData.email,
                    password: formData.password
                });
                
                // Redireciona baseado no tipo de usuário
                if (user.isAdmin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            } else {
                // Processo de registro
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('As senhas não coincidem');
                }
                
                const { confirmPassword, ...registrationData } = formData;
                await authService.register(registrationData);
                navigate('/user-dashboard');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Velociraptors do Rio</h1>
                    <p>Sua loja de dinossauros de estimação</p>
                </div>

                <div className="auth-toggle">
                    <button 
                        className={`toggle-btn ${isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(true)}
                        type="button"
                    >
                        Login
                    </button>
                    <button 
                        className={`toggle-btn ${!isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(false)}
                        type="button"
                    >
                        Criar Conta
                    </button>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLoginMode && (
                        <div className="form-group">
                            <label htmlFor="name">Nome Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite seu nome completo"
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite seu email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Digite sua senha"
                            disabled={isLoading}
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirme sua senha"
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processando...' : (isLoginMode ? 'Entrar' : 'Criar Conta')}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLoginMode ? (
                        <p>
                            Ainda não tem uma conta?{' '}
                            <button 
                                type="button"
                                className="link-button"
                                onClick={() => setIsLoginMode(false)}
                            >
                                Criar uma conta
                            </button>
                        </p>
                    ) : (
                        <p>
                            Já possui uma conta?{' '}
                            <button 
                                type="button"
                                className="link-button"
                                onClick={() => setIsLoginMode(true)}
                            >
                                Fazer login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;