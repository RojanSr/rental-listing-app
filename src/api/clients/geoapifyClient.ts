import axios, { AxiosError } from 'axios'

interface ApiErrorResponse {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  status: number
  code?: string
  errors?: Record<string, string[]>
}

const baseURL =
  import.meta.env.VITE_APP_GEOAPIFY_URL || 'https://api.geoapify.com/v1'
const apiKey = import.meta.env.VITE_APP_GEOAPIFY_API_KEY

export const geoapifyClient = axios.create({
  baseURL,
  timeout: 30000, // Default timeout: 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

geoapifyClient.interceptors.request.use((requestConfig) => {
  // Add API key as query parameter
  requestConfig.params = {
    ...requestConfig.params,
    apiKey,
  }
  return requestConfig
})

geoapifyClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      // The request was made and the server responded with an error
      const { data, status } = error.response
      throw {
        message: data?.message || 'An error occurred with the API request',
        status,
        code: data?.code,
        errors: data?.errors,
      } as ApiError
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        message: 'No response received from the server',
        status: 0,
      } as ApiError
    } else {
      // Something happened in setting up the request
      throw {
        message: error.message || 'Failed to make the request',
        status: 0,
      } as ApiError
    }
  },
)
