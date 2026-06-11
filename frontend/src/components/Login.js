// frontend/src/components/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // lê lista de emails admin das variáveis de ambiente
  const adminEmails = (
    (process.env.REACT_APP_ADMIN_EMAILS || process.env.REACT_APP_ADMIN_EMAIL) ||
    ""
  )
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // Helper: decide para onde redirecionar conforme email
  function redirectByEmail(userEmail) {
    const emailLower = (userEmail || "").toLowerCase();
    if (adminEmails.includes(emailLower)) {
      // Opção A: redireciona direto para o HTML estático do painel admin
      // Certifique-se de colocar frontend/public/nivelPainel.html
      window.location.href = "/nivelPainel.html";
    } else {
      navigate("/dashboard");
    }
  }

  // login por e-mail/senha
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // garante que exista documento users/{uid} (cria se necessário)
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            nome: user.displayName || "",
            email: user.email || "",
            foto: user.photoURL || "",
            criadoEm: new Date(),
            location: { city: "Itacoatiara-AM" },
          });
        }
      } catch (err) {
        console.warn("Erro ao criar/verificar documento do usuário:", err);
      }

      // redireciona conforme o email (admin ou usuário comum)
      redirectByEmail(user.email);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao fazer login: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Entrar</h1>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            className="auth-input"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.8 10.8 0 0112 4c5 0 9.3 3.1 11 8a12.5 12.5 0 01-2.1 3.5M6.6 6.6A12.4 12.4 0 001 12c1.7 4.9 6 8 11 8a10.8 10.8 0 005.4-1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-link" style={{ marginTop: 18 }}>
          Não tem conta?{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Criar conta
          </span>
        </p>
      </div>
    </div>
  );
}
