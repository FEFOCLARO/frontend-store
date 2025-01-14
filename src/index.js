import React from 'react';
import ReactDOM from 'react-dom/client';

// Importando os estilos na ordem correta:
// 1. Estilos globais primeiro
// 2. Depois os estilos específicos do index

import './styles/globals.css';
import './index.css';

// Importando o componente principal da aplicação

import App from './App';

// Criando a raiz do React e renderizando a aplicação

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);