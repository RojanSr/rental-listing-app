import type { Category } from '@/types'
import {
  BedDoubleIcon,
  Building2Icon,
  BuildingIcon,
  HouseIcon,
  type LucideIcon,
} from 'lucide-react'

export const IconMapping: Record<Category, LucideIcon> = {
  room: BedDoubleIcon,
  apartment: Building2Icon,
  flat: BuildingIcon,
  house: HouseIcon,
}
