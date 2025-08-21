import type { PropertyStatus } from '@/enums/post'
import type { Category } from '@/types'

export type CreatePropertyPayload = {
  roomCategory: Category
  description: string
  shortDescription: string
  numberOfRoom: number
  address: string
  longitude: number | null
  latitude: number | null
  rentalImages: File[]
  price: number
}

export type ReviewPayload = {
  propertyStatus: PropertyStatus
  rejectionReason?: string
}
