import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid #e6e6e6',
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  }

  const brandStyle = { fontWeight: 700, fontSize: 18 }
  const navLinks = { display: 'flex', gap: 12, alignItems: 'center' }
  const linkStyle = {
    color: '#111827',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 6,
  }
  const { user, logout } = useContext(AuthContext)

  function navigate(e, path){
    e && e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <div style={brandStyle}>
        <a href="/" onClick={(e) => navigate(e, '/')} style={{ color: 'inherit', textDecoration: 'none' }}>Jiseti</a>
      </div>
      <div style={navLinks}>
        <a href="/" onClick={(e) => navigate(e, '/')} style={linkStyle}>Home</a>
        {!user && (
          <>
            <a href="/login" onClick={(e) => navigate(e, '/login')} style={linkStyle}>Login</a>
            <a href="/register" onClick={(e) => navigate(e, '/register')} style={linkStyle}>Register</a>
          </>
        )}
        {user && (
          <>
            <span style={{ marginRight: 8 }}>Hello, {user.name}</span>
            <button onClick={() => { logout(); navigate(null, '/') }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
