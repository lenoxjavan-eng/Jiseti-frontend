import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
  const { user } = useContext(AuthContext)
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
        <button
          onClick={() => {
            if (user) {
              window.history.pushState({}, '', '/dashboard')
            } else {
              window.history.pushState({}, '', '/register')
            }
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
          style={cta}
          id="get-started"
        >
          Get Started
        </button>
      </main>
      <Footer />
    </div>
  )
}

