// src/components/AdminRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminEmails = (process.env.REACT_APP_ADMIN_EMAILS || process.env.REACT_APP_ADMIN_EMAIL || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const email = (user.email || "").toLowerCase();
      setIsAdmin(adminEmails.includes(email));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null; // pode exibir um spinner
  if (!auth.currentUser) return <Navigate to="/login" replace />;
  return isAdmin ? children : <Navigate to="/" replace />;
}
