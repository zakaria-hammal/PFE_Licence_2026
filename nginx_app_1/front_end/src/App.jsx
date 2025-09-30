import { useState } from 'react'  
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Langing'
import Messages from './pages/Messages'


export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f7f8fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <Header />
        <main style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
