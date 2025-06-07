import type { GeocodingResult } from '@/api/services/geocoding/types'
import type { SearchState } from '@/components/Navbar/Navbar'
import { Skeleton } from '@/components/ui/skeleton'
import type { UseQueryResult } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'

const AddressSuggestion = ({
  locationSuggestion,
  setSearch,
}: {
  locationSuggestion: UseQueryResult<GeocodingResult, Error>
  setSearch: (state: SearchState) => void
}) => {
  if (locationSuggestion.isLoading || locationSuggestion.isFetching) {
    return (
      <div className="flex items-center space-x-4 my-2">
        <div className="space-y-2 mt-2">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-8 w-[350px]" />
        </div>
      </div>
    )
  }

  if (!locationSuggestion.data?.features?.length) {
    return <p className="text-center my-4">No suggestion found</p>
  }

  return (
    <>
      {locationSuggestion.data?.features?.map((item) => {
        const location = item.properties
        return (
          <div
            key={location.place_id}
            className="cursor-pointer flex gap-3 items-center mt-3 hover:bg-zinc-100 py-4 px-2 rounded-md"
            onClick={() => {
              setSearch({
                value: location.formatted,
                lat: location.lat,
                lon: location.lon,
              })
            }}
          >
            <MapPin size={32} />
            <p className="text-md">{location.formatted}</p>
          </div>
        )
      })}
    </>
  )
}

export default AddressSuggestion
