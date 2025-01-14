import axios from 'axios';

// Criamos uma instância do Axios com a URL base do nosso backend
const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

// Função para interceptar requisições e adicionar o token de autenticação
api.interceptors.request.use((config) => {
    // Pegamos o token do localStorage, se existir
    const token = localStorage.getItem('adminToken');
    
    // Se houver um token, adicionamos ele ao cabeçalho da requisição
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

// Serviço para autenticação
export const AuthService = {
    // Login do administrador
    login: async (email, password) => {
        try {
            const response = await api.post('/admin/login', { email, password });
            // Guardamos o token para usar depois
            localStorage.setItem('adminToken', response.data.token);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Verifica se o usuário está autenticado
    isAuthenticated: () => {
        return !!localStorage.getItem('adminToken');
    },

    // Faz logout do usuário
    logout: () => {
        localStorage.removeItem('adminToken');
    }
};

// Serviço para gerenciar os dinossauros
export const DinoService = {
    // Busca todos os dinossauros
    getAllDinos: async () => {
        try {
            const response = await api.get('/dinosaurs');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Cadastra um novo dinossauro
    createDino: async (dinoData) => {
        try {
            const response = await api.post('/dinosaurs', dinoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Atualiza um dinossauro existente
    updateDino: async (id, dinoData) => {
        try {
            const response = await api.put(`/dinosaurs/${id}`, dinoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Remove um dinossauro
    deleteDino: async (id) => {
        try {
            const response = await api.delete(`/dinosaurs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api;