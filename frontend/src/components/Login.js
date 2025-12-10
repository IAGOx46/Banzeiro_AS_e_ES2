// frontend/src/components/Login.js
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

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

  // login com Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // se não existir usuário no Firestore, cria documento
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
            location: { city: "Itacoatiara-AM" }, // padrão
          });
        }
      } catch (err) {
        console.warn("Erro ao criar/verificar documento do usuário:", err);
      }

      // redireciona conforme o email
      redirectByEmail(user.email);
    } catch (err) {
      console.error("Erro ao logar com Google:", err);
      alert("Erro ao logar com Google: " + (err.message || err));
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

          <input
            type="password"
            className="auth-input"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <span style={{ color: "#e8f1ff", fontSize: 14 }}>ou</span>
        </div>

        <button
          type="button"
          className="auth-btn google-btn"
          onClick={handleGoogleLogin}
          style={{ marginTop: 12 }}
          disabled={loading}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={{ width: 20, marginRight: 10 }}
          />
          {loading ? "Carregando..." : "Entrar com Google"}
        </button>

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
