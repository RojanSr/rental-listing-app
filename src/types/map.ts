export type CoordinateType = {
  lat: number
  lon: number
}

export type VisibleMapView = {
  center: CoordinateType
  radius: number
  zoom: number
}
