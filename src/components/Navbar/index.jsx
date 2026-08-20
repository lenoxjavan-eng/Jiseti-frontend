import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useContext(AuthContext)
  const navigate = useNavigate()

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
  const linkStyle = ({ isActive }) => ({
    color: '#111827',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    background: isActive ? '#e8f3eb' : 'transparent',
    fontWeight: isActive ? 700 : 500,
  })

  const logoutStyle = {
    color: '#b42318',
    border: '1px solid #fecaca',
    background: '#fff',
    padding: '8px 12px',
    borderRadius: 6,
    cursor: 'pointer',
  }

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <Link to="/" style={{ ...brandStyle, color: '#111827', textDecoration: 'none' }}>Jiseti</Link>
      <div style={navLinks}>
        <NavLink to="/" end style={linkStyle}>Home</NavLink>
        {user ? (
          <>
            <NavLink to="/records" style={linkStyle}>My records</NavLink>
            <button
              type="button"
              style={logoutStyle}
              onClick={() => {
                signOut()
                navigate('/')
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={linkStyle}>Log in</NavLink>
            <NavLink to="/register" style={linkStyle}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
