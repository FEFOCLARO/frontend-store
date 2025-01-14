import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
   return (
       <header className="header">
           <div className="header__container">
               {/* Logo e nome */}
               <div className="header__logo">
                   <span className="header__logo-icon">🦖</span>
                   <h1 className="header__title">Velociraptors do Rio</h1>
               </div>

               {/* Navegação principal */}
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

               {/* Ações (Admin e Carrinho) */}
               <div className="header__actions">
                   <Link to="/admin" className="header__admin-link">Login/Criar conta</Link>
                   <button className="header__cart-button">
                       🛒 Carrinho (0)
                   </button>
               </div>
           </div>
       </header>
   );
}

export default Header;