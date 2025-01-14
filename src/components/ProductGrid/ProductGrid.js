import React, { useState } from 'react';
import './ProductGrid.css';

function ProductGrid() {
    // Estados para controles de visualização e ordenação
    const [sortOrder, setSortOrder] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');

    // Função para lidar com erros de carregamento de imagens
    const handleImageError = (e) => {
        e.target.src = 'https://place-hold.it/300x200/666/fff/000.jpeg?text=Raptor';
    };

    // Lista de dinossauros disponíveis
    const dinosaurs = [
        {
            id: 1,
            name: "Galinhão",
            species: "Velociraptor",
            history: "Capturado na Tijuca durante uma ocupação.",
            price: 19.99,
            stock: 1,
            imageUrl: "/images/raptor1.png",
            location: "Tijuca",
            temperament: "Dócil"
        },
        {
            id: 2,
            name: "Ligeirinho",
            species: "Velociraptor",
            history: "Capturado por uma arapuca simples por dois meninos da rocinha.",
            price: 19.99,
            stock: 3,
            imageUrl: "/images/raptor2.png",
            location: "Rocinha",
            temperament: "Agitado"
        },
        {
            id: 3,
            name: "Bebê",
            species: "Velociraptor",
            history: "Filhote de 2 meses de velociraptor achado às margens de Copacabana",
            price: 19.99,
            stock: 2,
            imageUrl: "/images/raptor3.png",
            location: "Copacabana",
            temperament: "Dócil"
        },
        {
            id: 4,
            name: "Malandrinho",
            species: "Velociraptor",
            history: "Encontrado sambando na Marquês de Sapucaí durante o carnaval",
            price: 24.99,
            stock: 1,
            imageUrl: "/images/raptor4.png",
            location: "Centro",
            temperament: "Agitado"
        }
    ];

    // Renderização do componente
    return (
        <div className="product-section">
            {/* Controles superiores */}
            <div className="product-controls">
                <div className="product-controls__left">
                    <span className="product-count">
                        {dinosaurs.length} Velociraptors encontrados
                    </span>
                </div>

                <div className="product-controls__right">
                    <select 
                        className="sort-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="featured">Destaques</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                        <option value="name">Nome</option>
                    </select>

                    <div className="view-toggles">
                        <button 
                            className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            📱 Grid
                        </button>
                        <button 
                            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📄 Lista
                        </button>
                    </div>
                </div>
            </div>

            {/* Container principal */}
            <div className="product-container">
                {/* Filtros laterais */}
                <aside className="product-filters">
                    <div className="filter-section">
                        <h3>Faixa de Preço</h3>
                        <div className="price-inputs">
                            <input type="number" placeholder="Min" />
                            <span>até</span>
                            <input type="number" placeholder="Max" />
                            <button className="filter-button">Filtrar</button>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Localização</h3>
                        <div className="checkbox-group">
                            <label>
                                <input type="checkbox" /> Zona Sul
                            </label>
                            <label>
                                <input type="checkbox" /> Zona Norte
                            </label>
                            <label>
                                <input type="checkbox" /> Zona Oeste
                            </label>
                            <label>
                                <input type="checkbox" /> Centro
                            </label>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Temperamento</h3>
                        <div className="checkbox-group">
                            <label>
                                <input type="checkbox" /> Dócil
                            </label>
                            <label>
                                <input type="checkbox" /> Agitado
                            </label>
                            <label>
                                <input type="checkbox" /> Territorial
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Grid de produtos */}
                <div className={`product-grid ${viewMode}`}>
                    {dinosaurs.map(dino => (
                        <div key={dino.id} className="product-card">
                            <div className="product-card__image">
                                <img 
                                    src={dino.imageUrl} 
                                    alt={dino.name}
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__title">{dino.name}</h3>
                                <p className="product-card__species">{dino.species}</p>
                                <p className="product-card__history">{dino.history}</p>
                                <div className="product-card__footer">
                                    <span className="product-card__price">
                                        R$ {dino.price.toFixed(2)}
                                    </span>
                                    <span className="product-card__stock">
                                        {dino.stock} disponível
                                    </span>
                                </div>
                                <button className="product-card__button">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;