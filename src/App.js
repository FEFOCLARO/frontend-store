// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Importamos o CartProvider
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import AuthPage from './pages/AuthPage/AuthPage';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { authService } from './services/authService';
import './App.css';

// Componente para proteger rotas que requerem autenticação
const PrivateRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
    return (
        // Envolvemos toda a aplicação com o CartProvider
        <CartProvider>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<ProductGrid />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route 
                            path="/user-dashboard" 
                            element={
                                <PrivateRoute>
                                    <UserDashboard />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/admin/dashboard" 
                            element={
                                <PrivateRoute>
                                    <AdminDashboard />
                                </PrivateRoute>
                            } 
                        />
                        <Route path="/login" element={<Navigate to="/auth" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;