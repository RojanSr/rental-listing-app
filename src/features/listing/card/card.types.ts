import type { Category } from '@/types/global'

export type ListingCardType = {
  id: number
  title: string
  category: Category
  bhk: number
  imgSrc: string
  location: string
  rate: number
  longitude: number
  latitude: number
  orientation?: 'vertical' | 'horizontal'
}
