import * as React from 'react'
import {
  Grid2X2CheckIcon,
  Grid2X2Icon,
  Grid2X2XIcon,
  UserIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppLogo } from '@/components/Logo'
import { CustomAlertDialog } from '@/components/feedback/CustomAlertDialog'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks'
import type { FileRouteTypes } from '@/routeTree.gen'
import type { AdminNavItemType } from './types'
import { AdminNavItem } from './AdminNavItem'

// This is sample data.
const data: Record<string, AdminNavItemType[]> = {
  user: [
    {
      name: 'Manage Users',
      url: '/admin/users/manage' as FileRouteTypes['fullPaths'],
      icon: UserIcon,
    },
  ],
  posts: [
    {
      name: 'Approval Pending List',
      url: '/admin/posts/pending',
      icon: Grid2X2Icon,
    },
    {
      name: 'Approved Posts',
      url: '/admin/posts/approved',
      icon: Grid2X2CheckIcon,
    },
    {
      name: 'Rejected Posts',
      url: '/admin/posts/rejected',
      icon: Grid2X2XIcon,
    },
  ],
}

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white items-center pt-6 pb-4">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        {/* render using loop if this extend further */}
        <AdminNavItem navItems={data.posts} groupLabel={'Posts'} />
        <AdminNavItem navItems={data.user} groupLabel={'Users'} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <CustomAlertDialog title="Do you want to log out?" onConfirm={logout}>
          <Button
            type="button"
            className="bg-transparent shadow-none p-0 !m-0 rounded-none hover:bg-neutral-50 text-red-600"
          >
            Log out
          </Button>
        </CustomAlertDialog>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
