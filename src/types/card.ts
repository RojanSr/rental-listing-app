import type { PropertyStatus } from '@/enums/post'
import type { Category } from '@/types'

export type PhotoType = {
  id: string
  photo: string
}

export type ListingCardType = {
  id: string
  purpose: number
  roomCategory: Category
  description: string
  shortDescription: string
  numberOfRoom: number
  address: string
  longitude: number
  latitude: number
  price: number
  priceUnitLabel: string
  photos: PhotoType[]
  isApproved: boolean
  propertyStatus: PropertyStatus
}
