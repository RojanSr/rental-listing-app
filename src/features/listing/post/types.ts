import type { PropertyDetailByID } from '@/api/services/app/types'
import type { DivClassName } from '@/types'

export type PostCommonProps = {
  data: PropertyDetailByID
  className?: DivClassName
}
