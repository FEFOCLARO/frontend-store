import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    // Separamos a função que controla o carrinho para maior clareza
    const handleCartClick = () => {
        // Futuramente implementaremos a lógica do carrinho aqui
        console.log('Funcionalidade do carrinho será implementada');
    };

    return (
        <header className="header">
            {/* Container principal que limita a largura e centraliza o conteúdo */}
            <div className="header__container">
                {/* Seção do logo - identidade visual da marca */}
                <div className="header__logo">
                    <Link to="/" className="header__logo-link">
                        <span className="header__logo-icon">🦖</span>
                        <h1 className="header__title">Velociraptors do Rio</h1>
                    </Link>
                </div>

                {/* Navegação principal - links mais importantes do site */}
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <Link to="/" className="header__nav-link">Início</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/catalog" className="header__nav-link">Catálogo</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/about" className="header__nav-link">Sobre</Link>
                        </li>
                    </ul>
                </nav>

                {/* Ações do usuário - login e carrinho */}
                <div className="header__actions">
                    <Link to="/auth" className="header__auth-link">
                        Login/Criar conta
                    </Link>
                    <button 
                        className="header__cart-button"
                        onClick={handleCartClick}
                    >
                        🛒 Carrinho (0)
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;