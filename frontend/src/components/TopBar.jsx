// frontend/src/components/TopBar.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./topbar.css";

export default function TopBar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".profile-area")) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        window.location.href = "/login"; // redireciona após logout
      })
      .catch((err) => console.error("Erro ao sair:", err));
  }

  const goToProfile = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="topbar">
      <h1 className="logo">Banzeiro</h1>

      <div className="profile-area" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="profile-circle">{user?.email?.charAt(0).toUpperCase() ?? "?"}</div>

        {menuOpen && (
          <div className="profile-menu">
            <button className="profile-btn" onClick={goToProfile}>Perfil</button>
            <button className="logout-btn" onClick={logout}>Sair</button>
          </div>
        )}
      </div>
    </div>
  );
}
