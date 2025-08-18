import { useMap } from 'react-leaflet'

export const RecenterMap = ({ lat, lon }: { lat?: number; lon?: number }) => {
  const map = useMap()

  if (lat && lon) {
    map.setView([lat, lon])
  }

  return null
}
