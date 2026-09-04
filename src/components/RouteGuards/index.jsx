import { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { fetchProfile } from '../../services/api'

export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export function AdminRoute({ children }) {
  const { user } = useContext(AuthContext)
  const [isVerifiedAdmin, setIsVerifiedAdmin] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    let isMounted = true

    if (!user || user.role !== 'admin') {
      setIsChecking(false)
      return () => { isMounted = false }
    }

    fetchProfile()
      .then((profile) => {
        if (isMounted) {
          setIsVerifiedAdmin(profile.is_staff === true)
          setIsChecking(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsVerifiedAdmin(false)
          setIsChecking(false)
        }
      })

    return () => { isMounted = false }
  }, [user])

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  if (isChecking) {
    return null
  }

  if (!isVerifiedAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}