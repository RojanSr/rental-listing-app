import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import ListingCard from '@/features/listing/card/ListingCard'
import { AnimatePresence, motion } from 'framer-motion'
import { useFetchNearestProperties } from '@/api/services/app/posts/queries'
import { cn } from '@/lib/utils'
import type { CoordinateType, ListingCardType } from '@/types'
import { RecenterMap } from '@/lib/leaflet'

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Map style options
const mapStyles = {
  googleStreets: {
    name: 'Google Streets',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
  googleHybrid: {
    name: 'Google Hybrid',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
  googleTerrain: {
    name: 'Google Terrain',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
  simple: {
    name: 'Simple',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  minimal: {
    name: 'Minimal',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  standard: {
    name: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}

export const Route = createLazyFileRoute('/search/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { query, lat, lon } = Route.useSearch()
  const navigate = useNavigate()

  const [center, setCenter] = useState<CoordinateType & { location: string }>({
    lat: lat || 0,
    lon: lon || 0,
    location: '',
  })
  const [activeStyle, setActiveStyle] = useState<string>('googleStreets')

  const { data, isLoading } = useFetchNearestProperties({
    userLat: lat,
    userLong: lon,
  })

  const handlePropertyClick = ({
    latitude,
    longitude,
    id,
    roomCategory,
    address,
  }: Pick<
    ListingCardType,
    'latitude' | 'longitude' | 'id' | 'roomCategory' | 'address'
  >) => {
    if (latitude === center.lat && longitude === center.lon) {
      navigate({ to: '/post/$postId', params: { postId: id } })
    } else {
      setCenter({
        lat: latitude,
        lon: longitude,
        location: `${roomCategory} in ${address}`,
      })
    }
  }

  if (!lat || !lon) {
    return (
      <p className="text-center font-semibold text-2xl">
        Unable to find location
      </p>
    )
  }

  if (isLoading) {
    return <p className="text-center font-semibold text-2xl">Fetching</p>
  }

  return (
    <div key={query} className="app-container">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className={data ? 'flex-1/12' : 'flex-1'}>
          <p className="pb-4 text-lg sticky top-[95px] bg-white z-10">
            Results for {query}
          </p>
          <AnimatePresence initial={false}>
            {data ? (
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
                {data.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() =>
                      handlePropertyClick({
                        id: listing.id,
                        latitude: listing.latitude,
                        longitude: listing.longitude,
                        address: listing.address,
                        roomCategory: listing.roomCategory,
                      })
                    }
                  >
                    <ListingCard {...listing} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center font-semibold text-2xl whitespace-nowrap mt-6">
                No listing around given location
              </p>
            )}
          </AnimatePresence>
        </div>
        <div
          className={cn('flex-1 h-[30dvh] md:h-[88vh] sticky top-[104px]', {
            'flex-2/6': !data,
          })}
        >
          <div className="absolute z-10 bottom-0 ">
            <select
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              className="m-2 p-2 text-sm border bg-white"
            >
              {Object.entries(mapStyles).map(([key, style]) => (
                <option key={key} value={key}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <MapContainer
            center={[lat, lon]}
            zoom={16}
            // className="rounded-3xl"
            className="rounded-3xl h-full w-full"
          >
            <TileLayer
              url={mapStyles[activeStyle as keyof typeof mapStyles].url}
              attribution={
                mapStyles[activeStyle as keyof typeof mapStyles].attribution
              }
            />
            {data?.map((listing) => (
              <Marker
                key={listing.id}
                position={[listing.latitude, listing.longitude]}
                riseOnHover
              >
                <Popup>
                  <Link
                    to="/post/$postId"
                    params={{ postId: listing.id?.toString() }}
                    target="_blank"
                  >
                    <div>
                      <strong>{listing.shortDescription}</strong>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            ))}
            <RecenterMap
              lat={center.lat}
              lon={center.lon}
              popupContent={
                center.location
                  ? `<strong style="text-transform:capitalize">${center.location}</strong>`
                  : ''
              }
            />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
