import React from 'react'

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

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <div style={brandStyle}>Jiseti</div>
      <div style={navLinks}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/login" style={linkStyle}>Login</a>
        <a href="/register" style={linkStyle}>Register</a>
      </div>
    </nav>
  )
}
