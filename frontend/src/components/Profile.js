// frontend/src/components/Profile.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../auth.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export default function Profile() {
  const [currentUid, setCurrentUid] = useState(null);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setCurrentUid(user.uid);
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        setNome(data.nome || user.displayName || "");
        setCidade((data.location && data.location.city) || "");
      } else {
        setNome(user.displayName || "");
        setCidade("");
      }
      setLoading(false);
    });

    return () => {
      unsubAuth();
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUid) return;
    if (!cidade) {
      alert("Escolha sua cidade.");
      return;
    }
    try {
      if (nome) await updateProfile(auth.currentUser, { displayName: nome });
      const userRef = doc(db, "users", currentUid);
      await updateDoc(userRef, {
        nome: nome || "",
        location: { city: cidade || "Itacoatiara-AM" },
      });
      alert("Perfil atualizado com sucesso.");
    } catch (err) {
      alert("Erro ao salvar perfil: " + err.message);
    }
  };

  // volta para o Dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <div style={{ padding: 20 }}>Carregando perfil...</div>;

  return (
    <div className="auth-page">
      {/* Botão fixo no canto superior esquerdo */}
      <button
        className="back-top-btn"
        type="button"
        onClick={goToDashboard}
        aria-label="Voltar para o dashboard"
      >
        {/* Ícone de seta */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Dashboard
      </button>

      <div className="auth-card">
        <h1 className="auth-title">Meu Perfil</h1>

        <form onSubmit={handleSave}>
          <input
            type="text"
            className="auth-input"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

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
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}
