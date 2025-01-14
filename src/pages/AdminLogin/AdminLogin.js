import React, { useState } from 'react';
import './AdminLogin.css';

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aqui você fará a chamada para sua API de login
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = '/admin/dashboard';
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;