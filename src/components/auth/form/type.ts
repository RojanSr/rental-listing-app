import type { AuthDialogState } from '../auth'

export type SignUpFormData = {
  fullName: string
  address: string
  email: string
  password: string
  contactNumber: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type AuthFormProps = {
  toggleAuthDialog: React.Dispatch<React.SetStateAction<AuthDialogState>>
}
