import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="site-navbar">
      <div className="brand">Jiseti</div>
      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create</Link>
        <Link to="/create/red-flag" className="nav-link">Red-Flag</Link>
        <Link to="/create/intervention" className="nav-link">Intervention</Link>
        <Link to="/my-records" className="nav-link">My Records</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </nav>
    </header>
  )
}
