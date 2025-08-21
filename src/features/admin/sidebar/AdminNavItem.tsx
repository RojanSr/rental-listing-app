import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { AdminNavItemType } from './types'
import { Link, useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export const AdminNavItem = ({
  navItems,
  groupLabel,
}: {
  navItems: AdminNavItemType[]
  groupLabel?: string
}) => {
  const location = useLocation()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden gap-1">
      <SidebarGroupLabel className="text-[0.8rem] text-black">
        {groupLabel}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {navItems.map((item) => {
          const isActive = location.href.includes(item.url)
          return (
            <SidebarMenuItem
              key={item.name}
              className={cn('rounded-lg hover:bg-neutral-100', {
                'bg-theme text-neutral-100 hover:bg-theme/95': isActive,
              })}
            >
              <Link to={item.url}>
                <div className="py-2">
                  <SidebarMenuButton
                    //   asChild
                    className={cn('px-6 cursor-pointer', {
                      'hover:bg-theme/0 hover:text-neutral-100 active:bg-theme active:text-neutral-100':
                        isActive,
                    })}
                  >
                    <item.icon />
                    <span className="text-[0.98rem]">{item.name}</span>
                  </SidebarMenuButton>
                </div>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
