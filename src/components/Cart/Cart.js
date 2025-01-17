// src/components/Cart/Cart.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

function Cart() {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        getTotal 
    } = useCart();

    // Função para formatar preços em reais
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="cart">
            <div className="cart-content">
                <div className="cart-header">
                    <h2>Seu Carrinho</h2>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <span className="empty-cart-icon">🦖</span>
                        <p>Seu carrinho está vazio</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-price">
                                            {formatPrice(item.price)}
                                        </p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-button"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total:</span>
                                <span>{formatPrice(getTotal())}</span>
                            </div>
                            <button className="checkout-button">
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;