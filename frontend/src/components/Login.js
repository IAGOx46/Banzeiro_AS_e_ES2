// frontend/src/components/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // redireciona para dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao fazer login: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // se não existir usuário no Firestore, cria documento
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          nome: user.displayName || "",
          email: user.email || "",
          foto: user.photoURL || "",
          criadoEm: new Date(),
          location: { city: "Itacoatiara-AM" } // padrão: Itacoatiara-AM
        });
      }

      // redireciona para dashboard
      navigate("/dashboard");
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
          <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/register")}>
            Criar conta
          </span>
        </p>
      </div>
    </div>
  );
}
