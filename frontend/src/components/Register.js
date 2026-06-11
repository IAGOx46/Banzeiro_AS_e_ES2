// frontend/src/components/Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState(""); // inicial vazio para mostrar placeholder

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!cidade) {
      alert("Escolha sua cidade.");
      return;
    }
    if (password.length < 6) {
      alert("Senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (nome) await updateProfile(userCredential.user, { displayName: nome });
      await sendEmailVerification(userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        nome: nome || "",
        foto: "",
        criadoEm: new Date(),
        location: {
          city: cidade,
        },
      });

      alert("Conta criada! Verifique seu e-mail para ativar o acesso.");
      navigate("/");
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Criar Conta</h1>

        <form onSubmit={handleCreate}>
          <input
            type="text"
            className="auth-input"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            className="auth-input"
            placeholder="Inserir Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Criar Senha"
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

          {/* Select com placeholder interno */}
          <select
            className="auth-input"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          >
            <option value="" disabled>Selecione sua cidade</option>
            <option value="Itacoatiara-AM">Itacoatiara-AM</option>
          </select>

          <button className="auth-btn" type="submit" style={{ marginTop: 14 }}>
            Confirmar Conta
          </button>

        </form>

        <p className="auth-link" onClick={() => navigate("/")}>
          já possui uma conta? Entrar
        </p>
      </div>
    </div>
  );
}
