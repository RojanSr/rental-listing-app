import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useMapEvents } from 'react-leaflet'
import type { VisibleMapView } from '@/types'

export const RecenterMap = ({
  lat,
  lon,
  popupContent,
}: {
  lat?: number
  lon?: number
  popupContent?: string
}) => {
  const map = useMap()

  useEffect(() => {
    if (lat && lon) {
      // Smooth fly animation
      map.flyTo([lat, lon], map.getZoom(), {
        animate: true,
        duration: 0.3,
      })

      // Only show popup if popupContent is provided
      if (popupContent) {
        const popup = L.popup().setLatLng([lat, lon]).setContent(popupContent)
        popup.openOn(map)
      }
    }
  }, [lat, lon, map, popupContent])

  return null
}

function radiusToZoom(
  radiusMeters: number,
  lat: number,
  mapWidthPx: number,
): number {
  const EARTH_CIRCUMFERENCE = 40075016.686 // meters at equator
  const metersPerPixel =
    (EARTH_CIRCUMFERENCE * Math.cos((lat * Math.PI) / 180)) / 256
  const zoom = Math.log2((metersPerPixel * mapWidthPx) / (2 * radiusMeters))
  return zoom
}

export const RadiusUpdater = ({
  onViewChange,
}: {
  onViewChange: (view: VisibleMapView) => void
}) => {
  const map = useMapEvents({
    moveend: handle,
    zoomend: handle,
  })

  function handle() {
    const bounds = map.getBounds()
    const center = map.getCenter()
    const radius = map.distance(center, bounds.getNorthEast())

    onViewChange({
      center: { lat: center.lat, lon: center.lng },
      radius,
      zoom: radiusToZoom(radius, center.lat, 1000),
    })
  }

  return null
}
