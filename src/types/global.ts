export type Category = 'room' | 'flat' | 'apartment' | 'house'

export type CoordinateType = {
  lat: number
  lon: number
}

export type GlobalResponse<T> = {
  success: boolean
  status: number
  message: string
  data: T
}
