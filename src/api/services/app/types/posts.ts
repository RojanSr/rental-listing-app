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
