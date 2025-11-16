import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared/css/Page.css";
import "./MenuDetail.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useMemo } from "react";

function MenuDetail() {
  const { id_refeicao, dia_da_semana } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  const alergenicoCores = {
    Glúten: "#E0B000",
    Lactose: "#4DA6FF",
    Soja: "#E07A00",
    Ovos: "#A04DFF",
    Amendoim: "#FF4D4D",
    Castanhas: "#8B5A2B",
    Trigo: "#D9A441",
    "Derivados de trigo": "#B88F33",
  };

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

  const detailIngredients = useMemo(() => {
    return detail?.ingredientes || [];
  }, [detail]);

  const macronutrientes = useMemo(() => {
    const mapa = {};

    detailIngredients.forEach((item) => {
      const macro = item.ingrediente.macronutriente;
      const qtd = item.quantidade;

      if (!mapa[macro]) {
        mapa[macro] = { total: 0, itens: [] };
      }

      mapa[macro].total += qtd;
      mapa[macro].itens.push(item);
    });

    return mapa;
  }, [detailIngredients]);

  const alergenicos = useMemo(() => {
    if (!detail?.ingredientes) return [];

    const lista = [];

    detail.ingredientes.forEach((item) => {
      const texto = item.ingrediente?.alergenico || "";

      const separados = texto
        .replace(".", "")
        .split(/,| e /gi)
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      lista.push(...separados);
    });

    return [...new Set(lista)];
  }, [detail]);

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
            {detailIngredients?.map((ingrediente) => (
              <li>{ingrediente?.ingrediente?.nome}</li>
            ))}
          </ul>
          <h4 className="color-blue">Informações Nutricionais</h4>
          <ul>
            <li>
              Valor Energético:{" "}
              {detailIngredients.length > 0
                ? detailIngredients?.reduce(
                    (a, b) =>
                      a.ingrediente.valor_energetico +
                      b.ingrediente.valor_energetico
                  )
                : 0}
              {" cal"}
            </li>

            {Object.entries(macronutrientes).map(([macro, data]) => (
              <li>
                {macro + ": " + data.total + " " + data.itens[0].unidade_medida}
              </li>
            ))}
          </ul>
          <h4 className="color-blue">Declaração de Alergênicos</h4>

          <div className="alergenicos-tags">
            {alergenicos.map((alergenico) => (
              <span
                key={alergenico}
                className="alergenico-tag"
                style={{
                  backgroundColor: alergenicoCores[alergenico] || "#ccc",
                }}
              >
                {alergenico.toUpperCase()}
              </span>
            ))}
          </div>
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
