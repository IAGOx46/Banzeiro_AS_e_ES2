import React from "react";
import "../auth.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Seja Bem Vindo ao Banzeiro</h2>
        <p className="subtitle">O seu site de Monitoramento Climático!</p>

        <div className="button-row">
          <button className="auth-btn light" onClick={() => navigate("/register")}>
            Criar conta
          </button>

          <button className="auth-btn" onClick={() => navigate("/login")}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
