// AdminDashboard.js - Painel de Controle Administrativo
// Este componente permite que administradores gerenciem o catálogo de velociraptors
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
    // GERENCIAMENTO DE ESTADO
    // Estado principal que armazena todos os dados do formulário em um único objeto
    // Isso facilita a manutenção e evita múltiplos estados separados
    const [formData, setFormData] = useState({
        name: '',               // Nome do velociraptor
        species: 'Velociraptor', // Espécie fixa
        history: '',           // História/origem do velociraptor
        price: '',            // Preço (sem formatação)
        location: '',         // Localização no Rio
        temperament: '',      // Temperamento do dinossauro
        stock: 1,             // Quantidade inicial mínima
        image: null,          // Arquivo da imagem
        imagePreview: null    // URL para preview da imagem
    });

    // Estado para controlar mensagens de feedback ao usuário
    const [feedback, setFeedback] = useState({
        type: null,     // 'success' ou 'error'
        message: null   // Mensagem a ser exibida
    });

    // Estado para controlar o carregamento durante operações
    const [loading, setLoading] = useState(false);

    // MANIPULADORES DE EVENTOS
    // Função que lida com mudanças em campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função especializada para lidar com upload de imagens
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Criamos um FileReader para gerar o preview da imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // INTERAÇÃO COM A API
    // Função principal que envia os dados para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Criamos um FormData para enviar dados multipart (necessário para imagens)
            const formDataToSend = new FormData();
            
            // Adicionamos cada campo ao FormData, exceto o preview da imagem
            Object.keys(formData).forEach(key => {
                if (key !== 'imagePreview') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Configuração completa da requisição
            const response = await fetch('http://localhost:3001/api/dinosaurs', {
                method: 'POST',
                body: formDataToSend,
                // Não definimos Content-Type pois o navegador o fará automaticamente com FormData
            });

            // Tratamento da resposta
            if (response.ok) {
                setFeedback({
                    type: 'success',
                    message: 'Velociraptor cadastrado com sucesso!'
                });
                
                // Limpamos o formulário após sucesso
                setFormData({
                    name: '',
                    species: 'Velociraptor',
                    history: '',
                    price: '',
                    location: '',
                    temperament: '',
                    stock: 1,
                    image: null,
                    imagePreview: null
                });
            } else {
                throw new Error('Falha ao cadastrar velociraptor');
            }
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    // RENDERIZAÇÃO
    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">Painel Administrativo</h1>
            
            {/* Feedback visual para o usuário */}
            {feedback.message && (
                <div className={`feedback-message ${feedback.type}`}>
                    {feedback.message}
                </div>
            )}

            {/* Formulário principal */}
            <form onSubmit={handleSubmit} className="admin-form">
                {/* Nome do Velociraptor */}
                <div className="form-group">
                    <label htmlFor="name">Nome do Velociraptor</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: Rex"
                    />
                </div>

                {/* História */}
                <div className="form-group">
                    <label htmlFor="history">História</label>
                    <textarea
                        id="history"
                        name="history"
                        value={formData.history}
                        onChange={handleInputChange}
                        required
                        placeholder="Conte a história deste velociraptor..."
                    />
                </div>

                {/* Preço */}
            <div className="form-group">
                    <label htmlFor="price">Preço (R$)</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: 999.99"
                    />
                </div>

                {/* Localização */}
                <div className="form-group">
                    <label htmlFor="location">Localização</label>
                    <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione a localização</option>
                        <option value="Zona Sul">Zona Sul</option>
                        <option value="Zona Norte">Zona Norte</option>
                        <option value="Zona Oeste">Zona Oeste</option>
                        <option value="Centro">Centro</option>
                    </select>
                </div>

                {/* Temperamento */}
                <div className="form-group">
                    <label htmlFor="temperament">Temperamento</label>
                    <select
                        id="temperament"
                        name="temperament"
                        value={formData.temperament}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione o temperamento</option>
                        <option value="Dócil">Dócil</option>
                        <option value="Agitado">Agitado</option>
                        <option value="Territorial">Territorial</option>
                    </select>
                </div>

                {/* Quantidade em Estoque */}
                <div className="form-group">
                    <label htmlFor="stock">Quantidade em Estoque</label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="1"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Upload de Imagem */}
                <div className="form-group">
                    <label>Imagem do Velociraptor</label>
                    <div 
                        className="image-upload-area"
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        {formData.imagePreview ? (
                            <img 
                                src={formData.imagePreview} 
                                alt="Preview" 
                                className="image-preview"
                            />
                        ) : (
                            <div className="upload-placeholder">
                                <span className="upload-icon">📸</span>
                                <p>Clique para fazer upload da imagem</p>
                            </div>
                        )}
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {/* Botão de Submit */}
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar Velociraptor'}
                </button>
            </form>
        </div>
    );
}

export default AdminDashboard;