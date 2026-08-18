import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../Modal'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  function navigate(e, path){
    e && e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
    <nav className="navbar" aria-label="Main navigation">
      <div className="brand">
        <a href="/" onClick={(e) => navigate(e, '/')} style={{ color: 'inherit', textDecoration: 'none' }}>Jiseti</a>
        {user && <span className="greeting">Hello, {user.name}</span>}
      </div>

      <div className="navlinks">
        <a className="navlink" href="/" onClick={(e) => navigate(e, '/')} >Home</a>

        {!user ? (
          <>
            <a className="navlink" href="/login" onClick={(e) => navigate(e, '/login')}>Login</a>
            <a className="navlink" href="/register" onClick={(e) => navigate(e, '/register')}>Register</a>
          </>
        ) : (
          <>
            <a className="navlink" href="/about" onClick={(e) => navigate(e, '/about')}>About</a>
            <a className="navlink" href="/how" onClick={(e) => navigate(e, '/how')}>How it works</a>
            <a className="navlink" href="/reports" onClick={(e) => navigate(e, '/reports')}>View reports</a>
            <button onClick={() => setShowLogoutConfirm(true)} aria-label="Logout" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </>
        )}
      </div>
    </nav>
    {showLogoutConfirm && (
      <Modal
        title="Confirm logout"
        onClose={() => setShowLogoutConfirm(false)}
        actions={[
          { label: 'Logout', onClick: () => { logout(); setShowLogoutConfirm(false); navigate(null, '/'); }, primary: true },
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    )}
    </>
  )
}

export function NavbarWithModalWrapper(props){
  return <Navbar {...props} />
}

