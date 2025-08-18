import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import type { FilterType } from '@/routes'
import type { GlobalResponse, ListingCardType } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchProperties = async ({ category }: { category: FilterType }) => {
  const response = await httpClient.get<GlobalResponse<ListingCardType[]>>(
    API_LIST.property.all,
    { params: category !== 'all' ? { category } : null },
  )
  return response
}

const useFetchProperties = ({ category }: { category: FilterType }) => {
  return useQuery({
    queryKey: [API_LIST.property.all, category],
    queryFn: () => fetchProperties({ category }),
    select: (data) => data.data.data,
  })
}

const fetchNearestProperties = async ({
  userLat,
  userLong,
}: {
  userLat: number | undefined
  userLong: number | undefined
}) => {
  if (!userLat || !userLong) return
  const response = await httpClient.get<GlobalResponse<ListingCardType[]>>(
    API_LIST.property.nearest,
    { params: { userLat, userLong } },
  )
  return response
}

const useFetchNearestProperties = ({
  userLat,
  userLong,
}: {
  userLat: number | undefined
  userLong: number | undefined
}) => {
  return useQuery({
    queryKey: [API_LIST.property.nearest, userLat, userLong],
    queryFn: () => fetchNearestProperties({ userLat, userLong }),
    select: (data) => data?.data.data,
  })
}

const fetchPropertyById = async ({ id }: { id: string }) => {
  const response = await httpClient.get<GlobalResponse<ListingCardType>>(
    `${API_LIST.property.all}/${id}`,
  )
  return response
}

const useFetchPropertyById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [API_LIST.property.all, id],
    queryFn: () => fetchPropertyById({ id }),
    select: (data) => data.data.data,
  })
}

export { useFetchProperties, useFetchNearestProperties, useFetchPropertyById }
