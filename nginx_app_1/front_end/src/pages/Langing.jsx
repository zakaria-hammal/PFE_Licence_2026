import React from 'react'
import Form from '../components/Form'

export default function Landing() {
  return (
    <section>
      <div style={{
        background: "#fff", padding: 16, borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <h2>Bienvenue</h2>
        <p>Remplis ton nom, email et message</p>
      </div>
      <Form />
    </section>
  )
}
