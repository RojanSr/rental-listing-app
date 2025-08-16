import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import ListingCard from '@/features/listing/card/ListingCard'
import { AnimatePresence, motion } from 'framer-motion'
import TestListing from '@/features/listing/listing.json'
import type { Category } from '@/types/global'

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
  const [activeStyle, setActiveStyle] = useState<string>('googleStreets')

  if (!lat || !lon) {
    return (
      <p className="text-center font-semibold text-2xl">
        Unable to find location
      </p>
    )
  }

  return (
    <div key={query} className="app-container">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1/12">
          <p className="pb-4 text-lg sticky top-[90px] bg-white z-10">
            Results for {query}
          </p>
          <AnimatePresence initial={false}>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
              {TestListing.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListingCard
                    {...listing}
                    category={listing.category as Category} // TODO: Remove this in future. Type assertion used due to type issue from json
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        <div className="flex-1 h-[30dvh] md:h-[90dvh] sticky top-[104px]">
          <div className="absolute z-10 bottom-0 ">
            <select
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              className="px-4 py-2 text-sm border bg-white"
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
            zoom={15}
            className="rounded-3xl"
            style={{
              height: 'inherit',
              width: '100%',
              zIndex: 9,
            }}
          >
            <TileLayer
              url={mapStyles[activeStyle as keyof typeof mapStyles].url}
              attribution={
                mapStyles[activeStyle as keyof typeof mapStyles].attribution
              }
            />
            {TestListing.map((listing) => (
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
                      <strong>{listing.title}</strong>
                      <br />
                      Location: {lat}, {lon}
                    </div>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
