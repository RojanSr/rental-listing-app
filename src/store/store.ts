import { create } from 'zustand'

type CoordinateType = {
  lat: number
  lon: number
}

export type DocumentStoreType = {
  coordinates: CoordinateType | undefined
  setCoordinates: (
    nextBreadcrumb:
      | CoordinateType
      | undefined
      | ((
          currentBreadcrumb: CoordinateType | undefined,
        ) => CoordinateType | undefined),
  ) => void
}

export const useGlobalStore = create<DocumentStoreType>((set) => ({
  coordinates: undefined,
  setCoordinates: (coordinates) =>
    set((state) => ({
      coordinates:
        typeof coordinates === 'function'
          ? coordinates(state.coordinates)
          : coordinates,
    })),
}))
