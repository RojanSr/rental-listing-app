import { useQuery } from '@tanstack/react-query'
import { geoapifyClient } from '@/api/clients/geoapifyClient'
import { GEOCODING } from './constants'
import type { GeocodeSearchParams, GeocodingResult } from './types'

const searchLocations = async (
  params: GeocodeSearchParams,
): Promise<GeocodingResult> => {
  const defaultParams = { limit: GEOCODING.DEFAULTS.SEARCH_LIMIT }
  const response = await geoapifyClient.get<GeocodingResult>(
    GEOCODING.ENDPOINTS.SEARCH,
    {
      params: { ...defaultParams, ...params },
    },
  )

  return response.data
}

const useSearchLocations = (
  params: GeocodeSearchParams,
  config: {
    enable: boolean
  },
) => {
  return useQuery({
    queryKey: [GEOCODING.ENDPOINTS.SEARCH, params.text, params.limit],
    queryFn: () => searchLocations(params),
    enabled: config.enable,
  })
}

export { useSearchLocations }
