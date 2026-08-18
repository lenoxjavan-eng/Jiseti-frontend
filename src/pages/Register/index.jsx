import React, { useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'

export default function Register() {
  const { setUser } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    if (users.find((u) => u.email === email)) {
      setError('Email already registered')
      return
    }
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('mockUsers', JSON.stringify(users))
    setUser({ name, email })
    localStorage.setItem('currentUser', JSON.stringify({ name, email }))
    setError(null)
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: 24 }}>
        <div className="form-card">
          <h2 style={{ marginBottom: 8 }}>Create account</h2>
          <p style={{ color: '#6b7280', marginBottom: 16 }}>Register a new account</p>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <label>
              <span className="form-label">Name</span>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              <span className="form-label">Email</span>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              <span className="form-label">Password</span>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            {error && <div style={{ color: 'crimson' }}>{error}</div>}
            <div>
              <Button type="submit" className="secondary">Create account</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

