import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weekMenu, setWeekMenu] = useState([]);

  useEffect(() => {
    const abort = new AbortController();
    async function fetchMenu() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://127.0.0.1:8000/cardapio", {
          signal: abort.signal,
        });

        if (!res.ok) throw new Error("Erro ao buscar menu");

        const data = await res.json();

        setError("");
        setWeekMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          "Não foi possível carregar o cardápio; mostrando dados locais."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
    return () => abort.abort();
  }, []);

  async function loadSearchData(search) {
    const abort = new AbortController();
    let url = "http://127.0.0.1:8000/cardapio";

    if (search) {
      url += `?dia_da_semana=${search}`;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(url, {
        signal: abort.signal,
      });

      if (!res.ok) throw new Error("Erro ao buscar menu");

      const data = await res.json();

      setError("");
      setWeekMenu(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Não foi possível carregar o cardápio; mostrando dados locais.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDetail(dia_da_semana, id_refeicao) {
    navigate(`/menu/${dia_da_semana}/${id_refeicao}`);
  }

  function handleSearch() {
    if (query.trim() === "") {
      return;
    }

    loadSearchData(query.trim());
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-left">
          <div className="home-chef-circle">
            <span className="material-symbols-outlined home-chef-icon">
              chef_hat
            </span>
          </div>
          <div className="home-header-title">Nutrisaber</div>
        </div>

        <div className="header-right">
          <button
            className="icon-btn"
            aria-label="perfil"
            onClick={() => navigate("/profile")}
          >
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
            onKeyDown={handleKeyPress}
          />
          <button
            className="search-btn"
            onClick={handleSearch}
            aria-label="buscar"
          >
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
                key={day.id_cardapio_semanal}
                className="day-card"
                onClick={() => handleOpenDetail(day.dia_da_semana, day.refeicao.id_refeicao)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter")
                    handleOpenDetail(day.id_cardapio_semanal);
                }}
              >
                <div className="day-title">{day.dia_da_semana}</div>
                <div className="day-summary">{day.refeicao.nome_prato}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <button
          className="footer-btn active"
          aria-label="home"
          onClick={() => navigate("/home")}
        >
          <HomeOutlinedIcon />
        </button>
        <button
          className="footer-btn"
          aria-label="cardapio"
          onClick={() => navigate("/menu/today")}
        >
          <MenuBookOutlinedIcon />
        </button>
        <button
          className="footer-btn"
          aria-label="favoritos"
          onClick={() => navigate("/favorites")}
        >
          <FavoriteBorderOutlinedIcon />
        </button>
        <button
          className="footer-btn"
          aria-label="mensagens"
          onClick={() => navigate("/messages")}
        >
          <SendOutlinedIcon />
        </button>
      </footer>
    </div>
  );
}

export default Home;
