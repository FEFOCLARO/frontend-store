// src/pages/DinosaurDetail/DinosaurDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './DinosaurDetail.css';

function DinosaurDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Aqui mantemos os mesmos dados dos dinossauros para manter a consistência
    const dinosaurs = [
        {
            id: 1,
            name: "Skarn",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor1.png",
            location: "Zona Sul",
            temperament: "Territorial",
            description: "Histórico: Skarn é uma lenda viva dos Arcos da Lapa. Ele desliza por telhados e vigas como um fantasma, muitas vezes confundido com uma sombra. Durante as noites, sua presença causa admiração e medo entre os moradores locais. Ele também tem o hábito peculiar de coletar objetos brilhantes, criando 'tesouros' em esconderijos secretos. Personalidade: Misterioso, independente, mas profundamente leal quando conquista confiança."
        },
        {
            id: 2,
            name: "Kaelix",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor2.png",
            location: "Zona Sul",
            temperament: "Territorial",
            description: "Histórico: Kaelix vive nas alturas, dominando o espaço ao redor do Cristo Redentor. Suas habilidades de escalada são lendárias, e ele é conhecido por 'dançar' nos ventos enquanto observa os turistas de cima. Ele também possui uma plumagem iridescente nas costas, que reflete a luz do sol em padrões coloridos. Personalidade: Majestoso, sereno e curioso."
        },
        {
            id: 3,
            name: "Vyrn",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor3.png",
            location: "Zona Sul",
            temperament: "Territorial",
            description: "Histórico: Vyrn é o protetor dos campos abandonados do Maracanã. Ele é um velociraptor musculoso, com cicatrizes que contam histórias de batalhas épicas contra outros predadores. Seus rugidos ressoam pelas arquibancadas vazias, reafirmando seu domínio. Vyrn também é incrivelmente leal, sempre disposto a defender seu dono com ferocidade. Personalidade: Forte, destemido e protetor."
        },
        {
            id: 4,
            name: "Zynara",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor4.png",
            location: "Zona Sul",
            temperament: "Territorial",
            description: "Histórico: Zynara é uma velociraptor conhecida por seu fascínio por arte. Ela foi vista várias vezes interagindo com as cores vibrantes da Escadaria Selarón, como se compreendesse a beleza das obras humanas. Zynara tem o hábito de criar padrões únicos com suas garras em superfícies macias, demonstrando habilidades artísticas impressionantes. Personalidade: Artística, amigável e curiosa."
        },
        {
            id: 5,
            name: "Draxor",
            species: "Velociraptor",
            price: 50000.00,
            imageUrl: "/images/raptor5.png",
            location: "Zona Sul",
            temperament: "Territorial",
            description: "Histórico: Draxor domina o trajeto do bondinho de Santa Teresa como ninguém. Sua habilidade de equilíbrio é fascinante, permitindo que ele corra pelos trilhos sem perder o controle. Ele também possui um instinto de proteção que o torna perfeito para tarefas de vigilância em movimento. Personalidade: Inteligente, ágil e leal."
        },
        // Adicione descrições para os outros dinossauros aqui
    ];

    const dinosaur = dinosaurs.find(d => d.id === Number(id));

    if (!dinosaur) {
        return <div>Dinossauro não encontrado</div>;
    }

    const handleAddToCart = () => {
        addToCart({
            id: dinosaur.id,
            name: dinosaur.name,
            price: dinosaur.price,
            imageUrl: dinosaur.imageUrl,
            species: dinosaur.species
        });
        alert(`${dinosaur.name} adicionado ao carrinho!`);
    };

    return (
        <div className="dinosaur-detail">
            <button 
                className="back-button"
                onClick={() => navigate('/')}
            >
                ← Voltar
            </button>

            <div className="detail-content">
                <div className="detail-image-container">
                    <img 
                        src={dinosaur.imageUrl} 
                        alt={dinosaur.name} 
                        className="detail-image"
                    />
                </div>

                <div className="detail-info">
                    <h1>{dinosaur.name}</h1>
                    <p className="species">{dinosaur.species}</p>
                    
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Localização:</span>
                            <span className="value">{dinosaur.location}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Temperamento:</span>
                            <span className="value">{dinosaur.temperament}</span>
                        </div>
                    </div>

                    <p className="description">{dinosaur.description}</p>

                    <div className="price-section">
                        <span className="price">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(dinosaur.price)}
                        </span>
                        <button 
                            className="add-to-cart-button"
                            onClick={handleAddToCart}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DinosaurDetail;