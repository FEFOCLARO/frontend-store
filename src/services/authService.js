import api from './api';

// Mudamos para exportar como um objeto nomeado
export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return { token, user };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login');
        }
    },

    register: async (userData) => {
        try {
            // Registra o usuário e obtém a resposta
            await api.post('/auth/register', userData);
            
            // Se o registro for bem-sucedido, faz login automático
            return await authService.login({
                email: userData.email,
                password: userData.password
            });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};

export default authService