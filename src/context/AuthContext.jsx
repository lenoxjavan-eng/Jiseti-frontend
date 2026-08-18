import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser'))
    } catch {
      return null
    }
  })

  useEffect(() => {
    function onStorage(e){
      if (e.key === 'currentUser') {
        try { setUser(JSON.parse(e.newValue)) } catch { setUser(null) }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
