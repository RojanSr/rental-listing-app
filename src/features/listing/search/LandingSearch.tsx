import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import SearchSuggestions from './SearchSuggestions'
import { useSearchLocations } from '@/api/services/geocoding/queries'
import { useDebounce } from '@/hooks/useDebounce'

const LandingSearch = () => {
  const [search, setSearch] = useState<{
    value: string
    lat: number | undefined
    lon: number | undefined
  }>({
    value: '',
    lat: undefined,
    lon: undefined,
  })
  console.log(search, 'search')
  const debouncedSearch = useDebounce(search, 500)

  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef(null)

  const locationSuggestion = useSearchLocations(
    {
      text: debouncedSearch.value,
    },
    {
      enable:
        !!debouncedSearch.value && !debouncedSearch.lat && !debouncedSearch.lon,
    },
  )

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="relative">
          <Input
            placeholder="Find homes in your dream location"
            className="outline-2 rounded-full p-6 w-3xs md:w-2xl text-sm md:text-[16px] placeholder:font-normal"
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200)
            }}
            onChange={(e) => {
              setSearch({
                value: e.target.value,
                lat: undefined,
                lon: undefined,
              })
            }}
            value={search.value}
          />
          <SearchSuggestions
            open={isFocused}
            ref={wrapperRef}
            search={search}
            setSearch={setSearch}
            locationSuggestion={locationSuggestion}
          />
        </div>
      </div>
    </>
  )
}

export default LandingSearch
