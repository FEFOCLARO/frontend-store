import React from 'react';
import './Header.css';

function Header() {
    // Função para lidar com o login/cadastro
    const handleAuthClick = () => {
        console.log('Implementar autenticação');
    };

    // Função para o carrinho de compras
    const handleCartClick = () => {
        console.log('Implementar carrinho');
    };

    return (
        <header>
            {/* Barra superior com links institucionais */}
            <div className="top-bar">
                <div className="top-bar__container">
                    <nav className="top-bar__nav">
                        <a href="/venda-seu-raptor">Venda seu Velociraptor</a>
                        <a href="/monte-seu-habitat">Monte seu Habitat</a>
                        <a href="/programa-vip">Programa VIP Raptor</a>
                        <a href="/unidades">Nossas Unidades</a>
                        <a href="/atendimento">Atendimento</a>
                    </nav>
                    <div className="top-bar__promo">
                        <span className="highlight">USEAPP</span> Cupom 5% OFF
                    </div>
                </div>
            </div>

            {/* Barra principal com busca e ações */}
            <div className="main-bar">
                <div className="main-bar__container">
                    {/* Logo da loja */}
                    <div className="main-bar__logo">
                        <img src="/logo-placeholder.png" alt="Velociraptors do Rio" />
                    </div>

                    {/* Campo de busca */}
                    <div className="main-bar__search">
                        <input 
                            type="text" 
                            placeholder="Encontre seu companheiro pré-histórico ideal..."
                        />
                        <button type="button" className="search-button">
                            🔍
                        </button>
                    </div>

                    {/* Ações do usuário */}
                    <div className="main-bar__actions">
                        <div className="televendas">
                            <span className="icon">📞</span>
                            <div className="info">
                                <span className="label">Televendas</span>
                                <span className="phone">(21) 3508-9979</span>
                            </div>
                        </div>

                        <button className="orders-button">
                            <span className="icon">📋</span>
                            <span>Meus Raptors</span>
                        </button>

                        <button className="auth-button" onClick={handleAuthClick}>
                            <span className="icon">👤</span>
                            <span>Entre ou Cadastre-se</span>
                        </button>

                        <button className="cart-button" onClick={handleCartClick}>
                            <span className="icon">🛒</span>
                            <span className="cart-count">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;