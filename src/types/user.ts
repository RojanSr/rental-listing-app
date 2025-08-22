import type { UserEnum } from '@/enums/user'

export type JWTPayload = {
  id: string
  email: string
  role: UserEnum
  fullName: string
  isApproved: boolean
  iat: number
  exp: number
}

export type UserInfo = {
  id: string
  fullName: string
  address: string
  email: string
  contactNumber: string
  createdAt: string
  updatedAt: string
  isBanned: boolean
  role: UserEnum
}
