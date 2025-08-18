import type { Category } from '@/types'

export const CONST_CATEGORIES: Category[] = [
  'room',
  'flat',
  'apartment',
  'house',
]

export const CATEGORY_TO_NEPALI: Record<Category, string> = {
  room: 'कोठा',
  apartment: 'अपार्टमेन्ट',
  flat: 'तला',
  house: 'घर',
}
