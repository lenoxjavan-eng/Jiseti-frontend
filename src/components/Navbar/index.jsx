import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../Modal'

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

  const brandStyle = { display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, fontSize: 18 }
  const navLinks = { display: 'flex', gap: 12, alignItems: 'center' }
  const linkStyle = {
    color: '#111827',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 6,
  }

  const { user, logout } = useContext(AuthContext)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  function navigate(e, path){
    e && e.preventDefault()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
    <nav style={navStyle} aria-label="Main navigation">
      <div style={brandStyle}>
        <a href="/" onClick={(e) => navigate(e, '/')} style={{ color: 'inherit', textDecoration: 'none' }}>Jiseti</a>
        {user && <span style={{ color: '#374151', fontWeight: 600 }}>Hello, {user.name}</span>}
      </div>

      <div style={navLinks}>
        <a href="/" onClick={(e) => navigate(e, '/')} style={linkStyle}>Home</a>

        {!user ? (
          // Not signed in: only show Login/Register
          <>
            <a href="/login" onClick={(e) => navigate(e, '/login')} style={linkStyle}>Login</a>
            <a href="/register" onClick={(e) => navigate(e, '/register')} style={linkStyle}>Register</a>
          </>
        ) : (
          // Signed in: show app links
          <>
            <a href="/about" onClick={(e) => navigate(e, '/about')} style={linkStyle}>About</a>
            <a href="/how" onClick={(e) => navigate(e, '/how')} style={linkStyle}>How it works</a>
            <a href="/reports" onClick={(e) => navigate(e, '/reports')} style={linkStyle}>View reports</a>
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
  // This wrapper re-exports the Navbar and renders modals via portal-like return when needed
  return <Navbar {...props} />
}

// logout confirmation modal rendered at top-level of module so JSX remains valid

