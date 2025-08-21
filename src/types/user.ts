export type UserType = 0 | 1 | 2

export type JWTPayload = {
  id: string
  email: string
  role: UserType
  fullName: string
  isApproved: boolean
  iat: number
  exp: number
}
