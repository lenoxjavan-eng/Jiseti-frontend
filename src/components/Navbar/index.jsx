import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) => `site-navbar__link${isActive ? ' is-active' : ''}`

  return (
    <header className="site-navbar">
      <div className="site-navbar__inner">
        <Link to="/" className="site-navbar__brand">
          <span className="site-navbar__mark">J</span>
          <span>Jiseti</span>
        </Link>
        <nav className="site-navbar__links" aria-label="Main navigation">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/how" className={linkClass}>Create report</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/reports" className={linkClass}>Reports</NavLink>
          {user ? (
            <>
              {user.role === 'admin' && <NavLink to="/admin/dashboard" className={linkClass}>Admin Dashboard</NavLink>}
              <button
                type="button"
                className="site-navbar__logout"
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
              <NavLink to="/login" className={linkClass}>Log in</NavLink>
              <NavLink to="/register" className="button button--small button--primary">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
