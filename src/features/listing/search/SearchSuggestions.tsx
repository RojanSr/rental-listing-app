import type { GeocodingResult } from '@/api/services/geocoding/types'
import { Skeleton } from '@/components/ui/skeleton'
import type { UseQueryResult } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Building2, MapPin, Mountain } from 'lucide-react'
import type { Ref } from 'react'

type SearchSuggestionsProps = {
  open: boolean
  ref: Ref<HTMLDivElement>
  search: {
    value: string
    lat: number | undefined
    lon: number | undefined
  }
  locationSuggestion: UseQueryResult<GeocodingResult, Error>
  setSearch: React.Dispatch<
    React.SetStateAction<{
      value: string
      lat: number | undefined
      lon: number | undefined
    }>
  >
}

const INITIAL_SUGGESTED_PLACES = [
  {
    id: 1,
    name: 'Nearby',
    description: "Find what's around you",
    icon: MapPin,
    colorCode: '62, 127, 179',
  },
  {
    id: 2,
    name: 'Kathmandu, Nepal',
    description: 'For city services',
    icon: Building2,
    colorCode: '13, 109, 25',
  },
  {
    id: 3,
    name: 'Pokhara, Nepal',
    description: 'For nature-lovers',
    icon: Mountain,
    colorCode: '62, 127, 179',
  },
]

const InitialSuggestion = () => {
  return (
    <>
      {INITIAL_SUGGESTED_PLACES?.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer flex gap-3 items-center mt-3 hover:bg-zinc-100 p-2 rounded-2xl"
        >
          <div
            className="w-12 h-12 rounded-md grid place-items-center"
            style={{ backgroundColor: `rgba(${item.colorCode}, 0.2)` }}
          >
            <item.icon color={`rgb(${item.colorCode})`} />
          </div>
          <div>
            <p className="text-md">{item.name}</p>
            <p className="text-zinc-500 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </>
  )
}

const QuerySuggestion = ({
  locationSuggestion,
  setSearch,
}: Pick<SearchSuggestionsProps, 'locationSuggestion' | 'setSearch'>) => {
  const navigate = useNavigate()
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
              navigate({
                to: '/search',
                search: {
                  query: location.formatted,
                  lat: location.lat,
                  lon: location.lon,
                },
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

const SearchSuggestions = ({
  open,
  ref,
  locationSuggestion,
  search,
  setSearch,
}: SearchSuggestionsProps) => {
  return (
    <div
      ref={ref}
      className={`absolute z-50 top-full left-0 min-w-md mt-2 rounded-3xl p-4 bg-white shadow-sm border border-gray-200 origin-top transform transition-all duration-300 ease-in-out ${
        open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}
    >
      <p className="select-none text-sm">Suggested places</p>

      {!search.value || !locationSuggestion.data ? (
        <InitialSuggestion />
      ) : (
        <QuerySuggestion
          locationSuggestion={locationSuggestion}
          setSearch={setSearch}
        />
      )}
    </div>
  )
}

export default SearchSuggestions
