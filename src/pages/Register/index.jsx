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
    window.location.href = '/'
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: 24, maxWidth: 520, margin: '32px auto' }}>
        <h2 style={{ marginBottom: 8 }}>Create account</h2>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>Register a new account</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </label>
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
            <Button type="submit" style={{ padding: '10px 14px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6 }}>Create account</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

