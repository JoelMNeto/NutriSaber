import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Home.css';

function MenuDetail() {
  const { day } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    // Assumed endpoint: /api/menu/day/:day
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/menu/day/${day}`);
        if (!res.ok) throw new Error('Erro');
        const data = await res.json();
        setDetail(data);
      } catch (err) {
        // fallback example
        setDetail({ day, meals: ['Prato 1', 'Prato 2', 'Sobremesa'] });
      }
    }
    fetchDetail();
  }, [day]);

  return (
    <div className="home-page">
      <header className="home-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>Voltar</button>
        <h3>{detail ? `Cardápio - ${detail.day || day}` : 'Carregando...'}</h3>
        <div />
      </header>

      <main className="home-content">
        {detail ? (
          <div className="day-card" style={{ minHeight: '120px' }}>
            <div className="day-title">{detail.day || day}</div>
            <ul>
              {detail.meals && detail.meals.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        ) : (
          <p>Carregando detalhes...</p>
        )}
      </main>
    </div>
  );
}

export default MenuDetail;
