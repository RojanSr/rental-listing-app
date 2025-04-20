import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NotFound from '@/components/feedback/NotFound'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </>
  ),
  notFoundComponent: NotFound,
})
