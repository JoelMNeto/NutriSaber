import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <header className="home-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>Voltar</button>
        <h3>Receitas Favoritas</h3>
        <div />
      </header>

      <main className="home-content">
        <p>Aqui serão listadas as receitas favoritas do aluno.</p>
      </main>
    </div>
  );
}

export default Favorites;
