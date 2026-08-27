import React, { createContext, useState } from 'react'
import { clearSession } from '../services/api'

export const AuthContext = createContext(null)

const CURRENT_USER_KEY = 'currentUser'

function getStoredUser() {
  try {
    const storedUser = window.localStorage.getItem(CURRENT_USER_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(getStoredUser)

  function signIn(session) {
    const nextUser = session.user || session
    const safeUser = {
      ...nextUser,
      name: nextUser.name || [nextUser.first_name, nextUser.last_name].filter(Boolean).join(' '),
      role: nextUser.is_staff ? 'admin' : 'user',
    }
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
  }

  function signOut() {
    window.localStorage.removeItem(CURRENT_USER_KEY)
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
