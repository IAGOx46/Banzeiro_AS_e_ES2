import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./topbar.css";

export default function TopBar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const db = getFirestore();

  // 🔥 Busca a foto do usuário no Firestore
  useEffect(() => {
    async function loadUserPhoto() {
      if (!user?.uid) return;

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          if (data.foto) {
            setPhotoURL(data.foto);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar foto:", err);
      }
    }

    loadUserPhoto();
  }, [user]);

  // 🔥 Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".profile-area")) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔥 Logout
  function logout() {
    signOut(auth)
      .then(() => (window.location.href = "/login"))
      .catch((err) => console.error("Erro ao sair:", err));
  }

  return (
    <div className="topbar">
      <h1 className="logo">Banzeiro</h1>

      <div className="profile-area" onClick={() => setMenuOpen(!menuOpen)}>
        
        {photoURL ? (
          <img
            src={photoURL}
            alt="Perfil"
            className="profile-photo"
            onError={() => setPhotoURL(null)} // Fallback se a foto quebrar
          />
        ) : (
          <div className="profile-circle">
            {user?.email?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}

        {menuOpen && (
          <div className="profile-menu">
            <button className="logout-btn" onClick={logout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
