import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks'
import { useSearchLocations } from '@/api/services/geocoding/queries'
import ListingAddressSuggestion from '../ListingAddressSuggestion/ListingAddressSuggestion'
import { useFormContext, useWatch } from 'react-hook-form'
import type { ListingFormValues } from '.'
import { RecenterMap } from '@/lib/leaflet'

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const ClickToAddMarker = () => {
  const { setValue } = useFormContext<ListingFormValues>()

  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng
    setValue('latitude', lat)
    setValue('longitude', lng)
  })

  return null
}

export const StepLocation = () => {
  const [showAddressSuggestion, setShowAddressSuggestion] = useState(false)

  const { control, setValue } = useFormContext<ListingFormValues>()

  const address = useWatch({ control, name: 'address' })
  const longitude = useWatch({ control, name: 'longitude' })
  const latitude = useWatch({ control, name: 'latitude' })

  const debouncedAddressSearch = useDebounce(address, 500)

  const locationSuggestion = useSearchLocations(
    {
      text: debouncedAddressSearch,
    },
    {
      enable: !!debouncedAddressSearch,
    },
  )

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="text-3xl font-semibold">Where's your place located?</p>
        <p className="text-neutral-700 text-md">
          Note that the address you shared is visible to everyone on this
          platform
        </p>
      </div>

      <div className="h-[500px] w-[600px] z-10 mt-8">
        {/* <LandingSearch setSearch={setSearch} search={search} /> */}

        <div className="relative grid gap-2">
          <Input
            id="address"
            name="address"
            onFocus={() => setShowAddressSuggestion(true)}
            onBlur={() => {
              setTimeout(() => setShowAddressSuggestion(false), 200)
            }}
            value={address}
            onChange={(e) => {
              const value = e.target.value
              if (value.trim()) setValue('address', value)
            }}
            placeholder="Enter property address"
            required
            autoComplete="off"
          />
          <div
            className={`absolute z-50 top-full left-0 min-w-md mt-2 rounded-3xl p-4 bg-white shadow-sm border border-gray-200 origin-top transform transition-all duration-300 ease-in-out ${showAddressSuggestion ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
          >
            <ListingAddressSuggestion
              locationSuggestion={locationSuggestion}
              setSearch={(state) => {
                setValue('address', state.value)
                setValue('latitude', state.lat || 0)
                setValue('longitude', state.lon || 0)
              }}
            />
          </div>
        </div>

        <MapContainer
          center={
            latitude && longitude ? [latitude, longitude] : [27.7103, 85.3222] // Yo chai Kathmandu ko center
          }
          zoom={15}
          zoomControl={false}
          className="rounded-3xl w-full h-full mt-4 z-10"
        >
          <TileLayer
            url={'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'}
          />
          {latitude && longitude && (
            <Marker position={[latitude, longitude]} riseOnHover></Marker>
          )}
          <RecenterMap lat={latitude} lon={longitude} />
          <ClickToAddMarker />
        </MapContainer>
      </div>
    </div>
  )
}
