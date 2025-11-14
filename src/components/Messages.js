import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Messages() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <header className="home-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>Voltar</button>
        <h3>Mensagens</h3>
        <div />
      </header>

      <main className="home-content">
        <p>Nesta tela é possível enviar mensagens para a escola e ver o histórico de conversas.</p>
      </main>
    </div>
  );
}

export default Messages;
