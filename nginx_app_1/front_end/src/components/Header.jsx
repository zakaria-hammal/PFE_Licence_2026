import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: "#fff", padding: "12px 16px", borderRadius: 8,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <div style={{ fontWeight: "bold" }}>FormApp</div>
      <nav>
        <Link to="/" style={{ marginRight: 12, textDecoration: "none", color: "#0b1220" }}>Accueil</Link>
        <Link to="/messages" style={{ textDecoration: "none", color: "#0b1220" }}>Messages</Link>
      </nav>
    </header>
  )
}
