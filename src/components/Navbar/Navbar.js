import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
    // Estado para controlar qual categoria está com dropdown aberto
    const [activeCategory, setActiveCategory] = useState(null);

    // Lista de categorias e suas subcategorias
    // Mantemos isso como uma constante para facilitar manutenção futura
    const categories = [
        {
            id: 'especies',
            name: 'Espécies',
            subcategories: [
                'Velociraptors Adultos',
                'Velociraptors Juvenis',
                'Filhotes Treinados'
            ]
        },
        {
            id: 'habitat',
            name: 'Habitat',
            subcategories: [
                'Terrários Personalizados',
                'Enriquecimento Ambiental',
                'Sistemas de Segurança'
            ]
        },
        {
            id: 'alimentacao',
            name: 'Alimentação',
            subcategories: [
                'Rações Premium',
                'Suplementos',
                'Petiscos Especiais'
            ]
        },
        {
            id: 'treinamento',
            name: 'Treinamento',
            subcategories: [
                'Cursos Básicos',
                'Treinamento Avançado',
                'Consultoria Especializada'
            ]
        }
    ];

    // Função que gerencia o hover nas categorias
    const handleCategoryHover = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <nav className="navbar">
            {/* Container principal - limita a largura e centraliza */}
            <div className="navbar__container">
                {/* Botão de todas as categorias - sempre visível */}
                <div 
                    className="navbar__all-categories"
                    onMouseEnter={() => handleCategoryHover('all')}
                    onMouseLeave={() => setActiveCategory(null)}
                >
                    <span className="navbar__icon">☰</span>
                    <span>TODAS AS CATEGORIAS</span>
                </div>

                {/* Lista de categorias principais */}
                <div className="navbar__categories">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`navbar__category ${activeCategory === category.id ? 'active' : ''}`}
                            onMouseEnter={() => handleCategoryHover(category.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            {/* Nome da categoria */}
                            {category.name}
                            
                            {/* Menu dropdown - aparece apenas quando categoria está ativa */}
                            {activeCategory === category.id && (
                                <div className="navbar__dropdown">
                                    {category.subcategories.map((sub, index) => (
                                        <a 
                                            key={index} 
                                            href={`/${category.id}/${sub.toLowerCase().replace(/ /g, '-')}`}
                                            className="navbar__dropdown-item"
                                        >
                                            {sub}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Seção de ofertas especiais - sempre visível */}
                <div className="navbar__promo">
                    <span className="navbar__promo-icon">🦖</span>
                    <span className="navbar__promo-text">OFERTAS JURÁSSICAS</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;