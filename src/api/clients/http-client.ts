import axios, { type AxiosInstance } from 'axios'
import { TokenService } from '@/lib/TokenService'

export const baseURL = import.meta.env.VITE_APP_BACKEND_URL
const THREE_MINUTES = 3 * 60 * 1000

const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
})

httpClient.interceptors.request.use(async (config) => {
  const token = TokenService.getToken('access_token')
  if (config && config.headers) {
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await TokenService.logout()
    }
    return Promise.reject(error)
  },
)

const httpClientFile: AxiosInstance = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
})

httpClientFile.interceptors.request.use(async (config) => {
  const token = TokenService.getToken('access_token')
  if (config && config.headers) {
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      config.responseType = 'blob'
    }
  }
  return config
})

export { httpClient, httpClientFile }
