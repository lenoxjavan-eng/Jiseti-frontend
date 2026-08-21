import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Login(){
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const users = JSON.parse(window.localStorage.getItem('mockUsers') || '[]')
    const normalizedEmail = email.trim().toLowerCase()
    const matchingUser = users.find(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password,
    )

    if (!matchingUser) {
      setError('We could not find an account with those details. Register first if you are new.')
      return
    }

    signIn(matchingUser)
    const destination = location.state?.from?.pathname || '/records'
    navigate(destination, { replace: true })
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle} aria-labelledby="login-title">
        <p style={eyebrowStyle}>JISETI</p>
        <h1 id="login-title" style={titleStyle}>Welcome back</h1>
        <p style={subtitleStyle}>Log in to manage your reports.</p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              style={inputStyle}
            />
          </label>
          {error && <p role="alert" style={errorStyle}>{error}</p>}
          <button type="submit" style={buttonStyle}>Log in</button>
        </form>
        <p style={footerTextStyle}>New to Jiseti? <Link to="/register">Create an account</Link>.</p>
        <p style={footerTextStyle}><Link to="/admin/login">Administrator sign in</Link></p>
      </section>
    </main>
  )
}

const pageStyle = { minHeight: 'calc(100vh - 67px)', display: 'grid', placeItems: 'center', padding: '40px 20px' }
const cardStyle = { width: '100%', maxWidth: 440, padding: 32, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)' }
const eyebrowStyle = { margin: 0, color: '#286b43', fontSize: 12, fontWeight: 800, letterSpacing: '0.16em' }
const titleStyle = { margin: '10px 0 8px', fontSize: 30, color: '#111827' }
const subtitleStyle = { margin: '0 0 24px', color: '#6b7280', lineHeight: 1.5 }
const formStyle = { display: 'grid', gap: 16 }
const labelStyle = { display: 'grid', gap: 7, color: '#374151', fontSize: 14, fontWeight: 600 }
const inputStyle = { width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '11px 12px', font: 'inherit' }
const buttonStyle = { border: 0, borderRadius: 8, padding: '12px 16px', background: '#286b43', color: '#fff', font: 'inherit', fontWeight: 700, cursor: 'pointer' }
const errorStyle = { margin: 0, padding: 12, borderRadius: 8, background: '#fef2f2', color: '#b42318', fontSize: 14, lineHeight: 1.45 }
const footerTextStyle = { margin: '22px 0 0', color: '#6b7280', fontSize: 14 }
