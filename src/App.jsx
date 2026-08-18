import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

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
  return <Home />
}

export default App
