import React, { useEffect, useState } from 'react'
import { getMessages, removeMessage } from '../utils/storage'

export default function Messages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages(getMessages())
  }, [])

  function handleDelete(id) {
    if (window.confirm("Supprimer ce message ?")) {
      setMessages(removeMessage(id))
    }
  }

  return (
    <section>
      <div style={{
        background: "#fff", padding: 16, borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: 20
      }}>
        <h2>Tous les messages</h2>
      </div>

      {messages.length === 0 && <p>Aucun message pour l instant.</p>}

      {messages.map(m => (
        <div key={m.id} style={{
          background: "#f9fafb", padding: 12, borderRadius: 6,
          marginBottom: 12, borderLeft: "4px solid #ddd"
        }}>
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
          <button onClick={() => handleDelete(m.id)} style={{
            background: "#ef4444", color: "white", border: "none",
            padding: "6px 10px", borderRadius: 6, cursor: "pointer"
          }}>Supprimer</button>
        </div>
      ))}
    </section>
  )
}
