import { successToast } from '@/lib/toaster'
import { TokenService } from '@/lib/TokenService'
import { useState, useEffect, useCallback } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = useCallback(() => {
    setIsAuthenticated(TokenService.checkAuth)
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const logout = useCallback(() => {
    TokenService.logout()
    setIsAuthenticated(false)
    successToast({
      title: 'Log out',
      description: 'You have been logged out',
    })
  }, [])

  return {
    isAuthenticated,
    logout,
    refreshAuth: checkAuth, // useful if you want to re-check auth manually
  }
}
