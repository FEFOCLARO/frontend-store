// src/pages/UserDashboard/UserDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useCart } from '../../contexts/CartContext';
import Cart from '../../components/Cart/Cart';
import './UserDashboard.css';

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const { cartItems, getTotal } = useCart();
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'cart':
                return <Cart />;
            case 'overview':
                return (
                    <div className="dashboard-overview">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Itens no Carrinho</h3>
                                <p>{cartItems.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total do Carrinho</h3>
                                <p>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(getTotal())}</p>
                            </div>
                        </div>
                    </div>
                );
            // Adicione outros cases conforme necessário
            default:
                return <div>Selecione uma opção</div>;
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={activeTab === 'overview' ? 'active' : ''}
                >
                    Visão Geral
                </button>
                <button 
                    onClick={() => setActiveTab('cart')}
                    className={activeTab === 'cart' ? 'active' : ''}
                >
                    Carrinho ({cartItems.length})
                </button>
                {/* Adicione mais botões conforme necessário */}
            </nav>

            <main className="dashboard-content">
                {renderContent()}
            </main>
        </div>
    );
}

export default UserDashboard;