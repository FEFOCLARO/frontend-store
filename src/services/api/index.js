import axios from 'axios';

// Criamos uma instância do Axios com configurações personalizadas
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Adicionamos um interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
    // Recuperamos o token do localStorage
    const token = localStorage.getItem('token');
    
    // Se houver um token, o incluímos no header Authorization
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
    response => response,
    error => {
        // Se o erro for de autenticação (401), podemos fazer logout
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        
        return Promise.reject(error);
    }
);

export default api;