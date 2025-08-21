import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { NotFound } from '@/components/feedback'
import type { JWTPayload } from '@/types/user'

interface MyRouterContext {
  queryClient: QueryClient
  user: JWTPayload | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </div>
  ),
  notFoundComponent: NotFound,
})
