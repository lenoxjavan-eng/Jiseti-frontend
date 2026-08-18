import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Reports from './pages/Reports'

function App() {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/')

  useEffect(() => {
    function onPop(){ setPath(window.location.pathname) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (path === '/login') return <Login />
  if (path === '/register') return <Register />
  if (path === '/dashboard') return <Dashboard />
  if (path === '/about') return <About />
  if (path === '/how') return <HowItWorks />
  if (path === '/reports') return <Reports />
  return <Home />
}

export default App
