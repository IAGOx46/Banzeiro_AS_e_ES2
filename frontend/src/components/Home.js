import React from "react";
import "../components/home.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logobanzeiro.png"; // <-- IMPORT LOGO

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-content">
        
        {/* LOGO */}
        <img src={Logo} alt="Banzeiro Logo" className="home-logo" />

        {/* TEXTOS */}
        <h1 className="home-title">Seja Bem Vindo ao Banzeiro</h1>
        <h2 className="home-subtitle">
          O seu site de Monitoramento Climatico
        </h2>

        {/* BOTÕES */}
        <div className="home-buttons">
          <button
            className="home-btn"
            onClick={() => navigate("/register")}
          >
            Cadastro
          </button>

          <button className="home-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        {/* LINK INFERIOR */}
        <p className="home-login-text">
          já possui uma conta?{" "}
          <span
            className="home-login-link"
            onClick={() => navigate("/login")}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
