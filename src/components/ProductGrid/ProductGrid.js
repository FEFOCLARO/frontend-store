// src/components/ProductGrid/ProductGrid.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './ProductGrid.css';
import { useNavigate } from 'react-router-dom';

function ProductGrid() {
    const navigate = useNavigate();
    // Obtemos a função addToCart do contexto do carrinho.
    // O hook useCart nos permite acessar as funcionalidades do carrinho de compras
    const { addToCart } = useCart();

    // Definimos nosso array de dinossauros como uma constante.
    // Cada dinossauro é um objeto com propriedades específicas que descrevem suas características
    const dinosaurs = [
        {
            id: 1,
            name: "Skarn da Lapa",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor1.png",
            location: "Zona Sul",
            temperament: "Territorial"
        },
        {
            id: 2,
            name: "Kaelix do Corcovado",
            species: "Velociraptor",
            price: 45000.00,
            imageUrl: "/images/raptor2.png",
            location: "Zona Norte",
            temperament: "Dócil"
        },
        {
            id: 3,
            name: "Vyrn do Maracanã",
            species: "Velociraptor",
            price: 45000.00,
            imageUrl: "/images/raptor3.png",
            location: "Zona Norte",
            temperament: "Dócil"
        },
        {
            id: 4,
            name: "Zynara de Selarón",
            species: "Velociraptor",
            price: 45000.00,
            imageUrl: "/images/raptor4.png",
            location: "Zona Norte",
            temperament: "Dócil"
        },
        {
            id: 5,
            name: "Draxor dos Trilhos",
            species: "Velociraptor",
            price: 25000.00,
            imageUrl: "/images/raptor5.png",
            location: "Zona Norte",
            temperament: "Dócil"
        }
    ];

    // Esta função é chamada quando o usuário clica no botão "Adicionar ao Carrinho"
    // Ela recebe um dinossauro como parâmetro e o adiciona ao carrinho
    const handleAddToCart = (dinosaur) => {
        addToCart({
            id: dinosaur.id,
            name: dinosaur.name,
            price: dinosaur.price,
            imageUrl: dinosaur.imageUrl,
            species: dinosaur.species
        });

        alert(`${dinosaur.name} adicionado ao carrinho!`);
    };

    // O componente renderiza um grid de cards, cada um representando um dinossauro
    return (
        <div className="product-grid">
            {dinosaurs.map(dinosaur => (
                <div key={dinosaur.id} className="product-card">
                    <img 
                        src={dinosaur.imageUrl} 
                        alt={dinosaur.name} 
                        className="product-image" 
                        onClick={() => navigate(`/dinosaur/${dinosaur.id}`)}
                        style={{ cursor: 'pointer' }}
                    />
                    <div className="product-info">
                        <h3>{dinosaur.name}</h3>
                        <p className="species">{dinosaur.species}</p>
                        <p className="location">Localização: {dinosaur.location}</p>
                        <p className="temperament">Temperamento: {dinosaur.temperament}</p>
                        <p className="price">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(dinosaur.price)}
                        </p>
                        <button 
                            className="add-to-cart-button"
                            onClick={() => handleAddToCart(dinosaur)}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default ProductGrid;