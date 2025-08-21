import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import type { FilterType } from '@/routes'
import type { GlobalResponse, ListingCardType } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PropertyDetailByID, ReviewPayload } from '../types'
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
  propertyStatus: PropertyStatus
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
  propertyStatus: PropertyStatus
}) => {
  return useQuery({
    queryKey: [API_LIST.property.all, propertyStatus],
    queryFn: () => fetchAllProperties({ propertyStatus }),
    select: (data) => data.data.data,
  })
}

const reviewProperty = async ({
  postId,
  payload,
}: {
  postId: string
  payload: ReviewPayload
}) => {
  if (!postId) return
  await httpClient.put(`${API_LIST.property.review}/${postId}`, payload)
}

const useReviewProperty = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reviewProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_LIST.property.all, postId],
      })
    },
  })
}

export {
  useFetchApprovedProperties,
  useFetchNearestProperties,
  useFetchPropertyById,
  useFetchAllProperties,
  useReviewProperty,
}
