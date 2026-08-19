import React from 'react'
import { Link } from 'react-router-dom'

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
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/create" style={linkStyle}>Create</Link>
        <Link to="/create/red-flag" style={linkStyle}>Create Red-Flag</Link>
        <Link to="/create/intervention" style={linkStyle}>Create Intervention</Link>
        <Link to="/my-records" style={linkStyle}>My Records</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  )
}
