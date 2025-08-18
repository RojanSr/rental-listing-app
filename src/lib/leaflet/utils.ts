import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

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
