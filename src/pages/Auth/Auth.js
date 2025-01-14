import React, { useState } from 'react';
import './Auth.css';

function Auth() {
    // Estado para controlar qual formulário mostrar
    const [isLogin, setIsLogin] = useState(true);
    
    // Estados para os formulários
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Função para lidar com login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                // Redireciona baseado no tipo de usuário
                if (data.isAdmin) {
                    window.location.href = '/admin/dashboard';
                } else {
                    window.location.href = '/';
                }
            }
        } catch (error) {
            alert('Erro ao fazer login');
        }
    };

    // Função para lidar com registro
    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            
            if (response.ok) {
                alert('Conta criada com sucesso! Faça login para continuar.');
                setIsLogin(true);
            }
        } catch (error) {
            alert('Erro ao criar conta');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-toggle">
                    <button 
                        className={`toggle-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Criar Conta
                    </button>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className="auth-form">
                        <h2>Bem-vindo de volta!</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                        <button type="submit">Entrar</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="auth-form">
                        <h2>Crie sua conta</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="Confirme a senha"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        />
                        <button type="submit">Criar Conta</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Auth;