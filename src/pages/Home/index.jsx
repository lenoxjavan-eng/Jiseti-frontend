import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <Navbar />
      <main className="hero">
        <div className="app-container" style={{padding:28}}>
          <h1 className="hero-title">Welcome to Jiseti</h1>
          <p className="hero-sub">
            A simple records app prototype. Create, view and manage records with a clean,
            minimal interface. Sign up or log in to get started.
          </p>
          {!user && (
            <button
              onClick={() => {
                window.history.pushState({}, '', '/register')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="btn"
              id="get-started"
            >
              Get Started
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

