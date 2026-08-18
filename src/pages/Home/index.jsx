import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Home() {
  const hero = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    padding: '48px 20px',
  }

  const title = { fontSize: 42, fontWeight: 800, marginBottom: 12 }
  const subtitle = { fontSize: 18, color: '#4b5563', maxWidth: 720, marginBottom: 20 }
  const cta = {
    display: 'inline-block',
    background: '#2563eb',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
  }

  return (
    <div>
      <Navbar />
      <main style={hero}>
        <h1 style={title}>Welcome to Jiseti</h1>
        <p style={subtitle}>
          A simple records app prototype. Create, view and manage records with a clean,
          minimal interface. Sign up or log in to get started.
        </p>
        <a href="/register" style={cta}>Get Started</a>
      </main>
      <Footer />
    </div>
  )
}
