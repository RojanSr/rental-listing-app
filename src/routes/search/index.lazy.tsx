import { createLazyFileRoute } from '@tanstack/react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

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

  const position: [number, number] = [Number(lat), Number(lon)]

  return (
    <div>
      <p className="py-4 text-lg">
        Search result for: <span className="font-medium">{query}</span>
      </p>

      <div className="mb-4">
        <label className="mr-2 font-medium">Map Style:</label>
        <select
          value={activeStyle}
          onChange={(e) => setActiveStyle(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          {Object.entries(mapStyles).map(([key, style]) => (
            <option key={key} value={key}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: '600px', width: '100%' }}
          >
            <TileLayer
              url={mapStyles[activeStyle as keyof typeof mapStyles].url}
              attribution={
                mapStyles[activeStyle as keyof typeof mapStyles].attribution
              }
            />
            <Marker position={position}>
              <Popup>
                <div>
                  <strong>{query}</strong>
                  <br />
                  Location: {lat}, {lon}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex-1 h-20"></div>
      </div>
    </div>
  )
}
