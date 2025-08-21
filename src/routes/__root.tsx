import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { NotFound } from '@/components/feedback'
import type { JWTPayload } from '@/types/user'
import { UserEnum } from '@/enums/user'
import { AdminLayout } from '@/features/admin/layout'

interface MyRouterContext {
  queryClient: QueryClient
  user: JWTPayload | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const { user } = useRouter().options.context
    const isSuperAdmin = user?.role === UserEnum.SuperAdmin

    return (
      <>
        {isSuperAdmin ? (
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        ) : (
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="grow">
              <Outlet />
            </div>
            <Footer />
          </div>
        )}
        <Toaster />
      </>
    )
  },
  notFoundComponent: NotFound,
})
