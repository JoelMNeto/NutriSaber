import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared/css/Page.css";
import "./MenuDetail.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

function MenuDetail() {
  const { id_refeicao, dia_da_semana } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/refeicoes?id_refeicao=${id_refeicao}`
        );

        if (!res.ok) throw new Error("Erro");

        const response = await res.json();
        const data =
          Array.isArray(response) && response.length > 0
            ? response[0]
            : response;

        setDetail(data);
      } catch (err) {
        setDetail(null);
      }
    }
    fetchDetail();
  }, [id_refeicao]);

  return (
    <div className="page">
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
        <div className="detail-container">
          <h2>{dia_da_semana}</h2>
          <h3 className="color-gray">{detail?.nome_prato}</h3>
          <h4 className="color-blue">Ingredientes</h4>
          <ul>
            {detail?.ingredientes?.map((ingrediente) => (
              <li>{ingrediente?.ingrediente?.nome}</li>
            ))}
          </ul>
        </div>
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
          className="footer-btn active"
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

export default MenuDetail;
