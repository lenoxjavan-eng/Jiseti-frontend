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
            <button onClick={() => setShowLogoutConfirm(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
    {showLogoutConfirm && (
      <Modal
        title="Confirm logout"
        onClose={() => setShowLogoutConfirm(false)}
        actions={[
          { label: 'Cancel', onClick: () => setShowLogoutConfirm(false) },
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

