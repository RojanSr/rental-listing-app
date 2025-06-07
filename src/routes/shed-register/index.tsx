import { TokenService } from '@/lib/TokenService'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/shed-register/')({
  beforeLoad: () => {
    const isAuthenticated = TokenService.checkAuth()
    if (!isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
})
