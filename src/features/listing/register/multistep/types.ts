import type { CreatePropertyPayload } from '@/api/services/app/types'

export type RegisterFormData = {
  images: {
    rentalImages: File[]
    src: string[]
  }
} & Omit<CreatePropertyPayload, 'rentalImages'>

export type ShedRegisterCommonProps = {
  formData: RegisterFormData
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>
}
