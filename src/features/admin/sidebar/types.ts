import type { FileRouteTypes } from '@/routeTree.gen'
import type { LucideIcon } from 'lucide-react'

export type AdminNavItemType = {
  name: string
  url: FileRouteTypes['fullPaths']
  icon: LucideIcon
}
