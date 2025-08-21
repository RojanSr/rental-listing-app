import Cookie from 'js-cookie'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'
import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '@/types/user'

const getToken = (
  token_name: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY,
): string | undefined => {
  return Cookie.get(token_name)
}

const setToken = ({
  key,
  value,
}: {
  key: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY
  value: string
}): void => {
  Cookie.set(key, value)
}

const logout = (): void => {
  Cookie.remove(ACCESS_TOKEN_KEY)
  Cookie.remove(REFRESH_TOKEN_KEY)
  window.location.pathname = '' //need to refresh page after logging out
}

const checkAuth = () => {
  if (getToken('access_token') && getToken('refresh_token')) {
    return true
  } else {
    return false
  }
}

const decodeToken = (): JWTPayload | null => {
  const token = getToken(ACCESS_TOKEN_KEY)
  if (!token) return null
  try {
    return jwtDecode<JWTPayload>(token)
  } catch {
    return null
  }
}

const TokenService = {
  getToken,
  setToken,
  checkAuth,
  logout,
  decodeToken,
}

export { TokenService }
