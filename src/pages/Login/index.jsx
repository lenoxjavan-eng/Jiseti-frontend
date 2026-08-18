import React, { useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      setError('Invalid email or password')
      return
    }
    setUser({ name: found.name, email: found.email })
    localStorage.setItem('currentUser', JSON.stringify({ name: found.name, email: found.email }))
    setError(null)
    // navigate to home without reload
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: 24, maxWidth: 520, margin: '32px auto' }}>
        <h2 style={{ marginBottom: 8 }}>Log in</h2>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>Sign in to your account</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            Email
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </label>
          <label>
            Password
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </label>
          {error && <div style={{ color: 'crimson' }}>{error}</div>}
          <div>
            <Button type="submit" style={{ padding: '10px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6 }}>Log in</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

