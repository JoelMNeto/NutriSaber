import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weekMenu, setWeekMenu] = useState([]);

  useEffect(() => {
    const abort = new AbortController();
    async function fetchMenu() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/menu/week', { signal: abort.signal });
        if (!res.ok) throw new Error('Erro ao buscar menu');
        const data = await res.json();
        setWeekMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        setWeekMenu([
          { id: 'monday', day: 'Segunda', summary: 'Arroz, Feijão, Frango grelhado' },
          { id: 'tuesday', day: 'Terça', summary: 'Macarrão ao molho, Salada' },
          { id: 'wednesday', day: 'Quarta', summary: 'Peixe assado, Purê' },
          { id: 'thursday', day: 'Quinta', summary: 'Feijoada leve, Couve' },
          { id: 'friday', day: 'Sexta', summary: 'Pizza caseira, Salada' },
        ]);
        setError('Não foi possível carregar o cardápio; mostrando dados locais.');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
    return () => abort.abort();
  }, []);

  function handleOpenDetail(dayId) {
    navigate(`/menu/${dayId}`);
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-left">
          <div className="chef-circle">
            <span className="material-symbols-outlined chef-icon">chef_hat</span>
          </div>
          <div className="header-title">Nutrisaber</div>
        </div>

        <div className="header-right">
          <button className="icon-btn" aria-label="perfil" onClick={() => navigate('/profile')}>
            <AccountCircleIcon />
          </button>
          <button className="icon-btn" aria-label="notificacoes">
            <NotificationsNoneIcon />
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Pesquise aqui"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" aria-label="buscar">
            <SearchIcon />
          </button>
        </div>

        <section className="week-menu">
          <div className="week-header">
            <h2>Cardápio da semana</h2>
            {loading && <small>Carregando...</small>}
            {error && <small className="error-msg">{error}</small>}
          </div>

          <div className="days-list">
            {weekMenu.map((day) => (
              <div
                key={day.id}
                className="day-card"
                onClick={() => handleOpenDetail(day.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') handleOpenDetail(day.id); }}
              >
                <div className="day-title">{day.day}</div>
                <div className="day-summary">{day.summary}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <button className="footer-btn active" aria-label="home" onClick={() => navigate('/home')}>
          <HomeOutlinedIcon />
        </button>
        <button className="footer-btn" aria-label="cardapio" onClick={() => navigate('/menu/today')}>
          <MenuBookOutlinedIcon />
        </button>
        <button className="footer-btn" aria-label="favoritos" onClick={() => navigate('/favorites')}>
          <FavoriteBorderOutlinedIcon />
        </button>
        <button className="footer-btn" aria-label="mensagens" onClick={() => navigate('/messages')}>
          <SendOutlinedIcon />
        </button>
      </footer>
    </div>
  );
}

export default Home;
