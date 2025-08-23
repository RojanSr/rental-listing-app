import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import type { FilterType } from '@/routes'
import type { GlobalResponse, ListingCardType, VisibleMapView } from '@/types'
import { useQuery } from '@tanstack/react-query'
import type { PropertyDetailByID } from '../types'
import type { PropertyStatus } from '@/enums/post'

const fetchApprovedProperties = async ({
  category,
}: {
  category: FilterType
}) => {
  const response = await httpClient.get<GlobalResponse<ListingCardType[]>>(
    API_LIST.property.approved,
    { params: category !== 'all' ? { category } : null },
  )
  return response
}

const useFetchApprovedProperties = ({ category }: { category: FilterType }) => {
  return useQuery({
    queryKey: [API_LIST.property.approved, category],
    queryFn: () => fetchApprovedProperties({ category }),
    select: (data) => data.data.data,
  })
}

const fetchNearestProperties = async (mapView: VisibleMapView) => {
  if (!mapView.center.lat || !mapView.center.lon || !mapView.radius) return
  const lat = mapView.center.lat
  const lon = mapView.center.lon
  const radius = mapView.radius
  const response = await httpClient.get<GlobalResponse<ListingCardType[]>>(
    API_LIST.property.nearest,
    { params: { userLat: lat, userLong: lon, radiusMeters: radius } },
  )
  return response
}

const useFetchNearestProperties = (mapView: VisibleMapView) => {
  return useQuery({
    queryKey: [API_LIST.property.nearest, { ...mapView }],
    queryFn: () => fetchNearestProperties(mapView),
    select: (data) => data?.data.data,
  })
}

const fetchPropertyById = async ({ id }: { id: string }) => {
  const response = await httpClient.get<GlobalResponse<PropertyDetailByID>>(
    `${API_LIST.property.all}/${id}`,
  )
  return response
}

const useFetchPropertyById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [API_LIST.property.all, id],
    queryFn: () => fetchPropertyById({ id }),
    select: (data) => data.data.data,
    enabled: !!id,
  })
}

const fetchAllProperties = async ({
  propertyStatus,
}: {
  propertyStatus?: PropertyStatus
}) => {
  const response = await httpClient.get<GlobalResponse<ListingCardType[]>>(
    API_LIST.property.all,
    { params: { propertyStatus } },
  )
  return response
}

const useFetchAllProperties = ({
  propertyStatus,
}: {
  propertyStatus?: PropertyStatus
}) => {
  return useQuery({
    queryKey: [API_LIST.property.all, propertyStatus],
    queryFn: () => fetchAllProperties({ propertyStatus }),
    select: (data) => data.data.data,
  })
}

export {
  useFetchApprovedProperties,
  useFetchNearestProperties,
  useFetchPropertyById,
  useFetchAllProperties,
}
