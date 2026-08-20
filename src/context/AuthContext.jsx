import React, { createContext, useState } from 'react'

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

  function signIn(nextUser) {
    const safeUser = { name: nextUser.name, email: nextUser.email, role: nextUser.role || 'user' }
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
  }

  function signOut() {
    window.localStorage.removeItem(CURRENT_USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
