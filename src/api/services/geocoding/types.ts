export interface GeocodingResult {
  features: {
    properties: {
      place_id: string
      formatted: string
      name: string
      state: string
      city: string
      country: string
      lat: number
      lon: number
    }
  }[]
  query: { text: string }
}

export interface GeocodeSearchParams {
  text: string
  limit?: number
}
