import type { ListingCardType } from '@/types'

export const LISTING_CARD_DEFAULT_VALUES: ListingCardType = {
  id: '',
  purpose: 1,
  roomCategory: 'room',
  description: '',
  shortDescription: '',
  numberOfRoom: 1,
  address: '',
  longitude: 0,
  latitude: 0,
  price: 0,
  priceUnitLabel: 'per flat',
  photos: [],
  isApproved: false,
  propertyStatus: 1,
}
