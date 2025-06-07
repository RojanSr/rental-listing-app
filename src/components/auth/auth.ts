type AuthType = 'login' | 'signup'

export type AuthDialogState = {
  authType: AuthType
  open: boolean
}
