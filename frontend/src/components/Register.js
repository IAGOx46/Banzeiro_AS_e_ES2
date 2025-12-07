// frontend/src/components/Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState(""); // inicial vazio para mostrar placeholder

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

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

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
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

      alert("Conta criada com Google!");
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao criar conta com Google: " + err.message);
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
            <div className="eye-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#555" d="M12 6c3.86 0 7.17 2.22 8.82 5.5-.59 1.15-1.42 2.19-2.41 3.07l1.41 1.41C21.07 14.63 22 13 22 12c-1.73-4.39-6-7.5-11 -7.5-1.27 0-2.49.2-3.64.57l1.59 1.59C10.42 6.2 11.2 6 12 6z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#555" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11 -7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
              )}
            </div>
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

          <button type="button" className="auth-btn google-btn" onClick={handleGoogleRegister} style={{ marginTop: 8 }}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" style={{ width: 20, marginRight: 10 }} />
            Criar conta com Google
          </button>
        </form>

        <p className="auth-link" onClick={() => navigate("/")}>
          já possui uma conta? Entrar
        </p>
      </div>
    </div>
  );
}
