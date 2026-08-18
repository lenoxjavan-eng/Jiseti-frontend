import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/login') return <Login />
  if (path === '/register') return <Register />
  return <Home />
}

export default App
