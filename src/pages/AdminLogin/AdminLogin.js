import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './AdminLogin.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { user } = await authService.login(credentials);
            
            if (!user.isAdmin) {
                throw new Error('Acesso restrito a administradores');
            }
            
            navigate('/admin/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login__card">
                <div className="admin-login__header">
                    <h1>Login Administrativo</h1>
                    <p>Acesso restrito a administradores</p>
                </div>
                
                {error && (
                    <div className="admin-login__error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-login__form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="admin-login__button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;