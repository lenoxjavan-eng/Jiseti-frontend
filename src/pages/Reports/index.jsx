import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'

export default function Reports(){
  const { user } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(!user)

  useEffect(() => setShowModal(!user), [user])

  function goToLogin(){
    setShowModal(false)
    window.history.pushState({}, '', '/login')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  function closeAndHome(){
    setShowModal(false)
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: 24, maxWidth: 900, margin: '24px auto' }}>
        <h1>Reports</h1>
        {user ? (
          <p>Placeholder reports view. Only visible when signed in as {user.name}.</p>
        ) : (
          <p style={{ color: '#6b7280' }}>You must sign in to view reports.</p>
        )}
      </main>
      <Footer />

      {showModal && (
        <Modal
          title="Sign in required"
          onClose={closeAndHome}
          actions={[{ label: 'Sign in', onClick: goToLogin, primary: true }]}
        >
          <p>Please sign in to access reports.</p>
        </Modal>
      )}
    </div>
  )
}
