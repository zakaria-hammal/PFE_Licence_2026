
import React, { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  // Charger les messages depuis l’API au montage
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("https://localhost/get/messages");
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.error("Erreur serveur :", res.status);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
      }
    }

    fetchMessages();
  }, []);

  // Suppression d’un message via API
  async function handleDelete(id) {
    if (window.confirm("Supprimer ce message ?")) {
      try {
        const res = await fetch(`https://localhost/modify/deleteMessage/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setMessages(messages.filter((m) => m._id !== id));
        } else {
          alert("Erreur serveur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        alert("Impossible de contacter le serveur");
      }
    }
  }

  return (
    <section>
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: 20,
        }}
      >
        <h2>Tous les messages</h2>
      </div>

      {messages.length === 0 && <p>Aucun message pour l’instant.</p>}

      {messages.map((m) => (
        <div
          key={m._id}
          style={{
            background: "#f9fafb",
            padding: 12,
            borderRadius: 6,
            marginBottom: 12,
            borderLeft: "4px solid #ddd",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>{m.name}</strong> <br />
              <span style={{ color: "#6b7280" }}>{m.email}</span>
            </div>
            <small style={{ color: "#6b7280" }}>
              {new Date(m.createdAt).toLocaleString()}
            </small>
          </div>
          <p>{m.message}</p>
          <button
            onClick={() => handleDelete(m._id)}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Supprimer
          </button>
        </div>
      ))}
    </section>
  );
}
