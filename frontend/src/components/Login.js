import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user.emailVerified) {
        alert("Verifique seu e-mail antes de entrar!");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Realizar Login</h1>

        <form onSubmit={handleLogin}>
          
          <input
            type="email"
            className="auth-input"
            placeholder="Inserir Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Senha com ícone profissional */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Inserir Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                /* Olho Fechado */
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="#555"
                    d="M12 6c3.86 0 7.17 2.22 8.82 5.5-.59 1.15-1.42 2.19-2.41 3.07l1.41 1.41C21.07 
                    14.63 22 13 22 12c-1.73-4.39-6-7.5-11 -7.5-1.27 0-2.49.2-3.64.57l1.59 1.59C10.42 6.2 
                    11.2 6 12 6zm-9.64-.57L3.95 7.04C2.76 8.23 1.86 9.58 1 11.5c1.73 4.39 6 7.5 11 
                    7.5 1.72 0 3.36-.32 4.86-.94l1.78 1.78 1.41-1.41L3.36 4.01 2.36 3z"
                  />
                </svg>
              ) : (
                /* Olho Aberto */
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="#555"
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 
                    7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11 
                    -7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 
                    5-5 5 2.24 5 5-2.24 5-5 
                    5zm0-8c-1.66 0-3 1.34-3 
                    3s1.34 3 3 3 3-1.34 
                    3-3-1.34-3-3-3z"
                  />
                </svg>
              )}
            </div>
          </div>

          <button className="auth-btn" type="submit">
            Entrar na Conta
          </button>
        </form>

        <p className="auth-link" onClick={() => navigate("/register")}>
          Criar Conta
        </p>
      </div>
    </div>
  );
}
