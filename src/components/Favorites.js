import { useNavigate } from 'react-router-dom';
import "../shared/css/Page.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-left">
          <div className="chef-circle">
            <span
              onClick={() => navigate("/home")}
              className="material-symbols-outlined chef-icon"
            >
              chef_hat
            </span>
          </div>
          <div className="header-title">Nutrisaber</div>
        </div>
      </header>

      <main className="content">
        Em construção: favoritos
      </main>

      <footer className="app-footer">
        <button
          className="footer-btn"
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
          className="footer-btn active"
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

export default Favorites;
