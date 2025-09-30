
import React, { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("https://localhost/modify/addMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("server-error");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setStatus("network-error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginTop: 20,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <label>Nom</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="4"
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          background: "#0b1220",
          color: "white",
          border: "none",
          padding: "10px 14px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Envoyer
      </button>

      {status === "success" && (
        <span style={{ marginLeft: 12, color: "green" }}>Envoyé</span>
      )}
      {status === "error" && (
        <span style={{ marginLeft: 12, color: "red" }}>
          Remplis tous les champs
        </span>
      )}
      {status === "server-error" && (
        <span style={{ marginLeft: 12, color: "red" }}>
           Erreur du serveur
        </span>
      )}
      {status === "network-error" && (
        <span style={{ marginLeft: 12, color: "red" }}>
          Serveur injoignable
        </span>
      )}
    </form>
  );
}
