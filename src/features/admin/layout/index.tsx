import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { type PropsWithChildren } from 'react'
import { AdminSidebar } from '../sidebar'

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
