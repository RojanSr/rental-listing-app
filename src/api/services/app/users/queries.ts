import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import type { GlobalResponse } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UserListType } from '../types'
import type { UserInfo } from '@/types/user'

const fetchAllUsers = async () => {
  const response = await httpClient.get<GlobalResponse<UserListType[]>>(
    API_LIST.user.all,
  )
  return response
}

const useFetchAllUsers = () => {
  return useQuery({
    queryKey: [API_LIST.user.all],
    queryFn: fetchAllUsers,
    select: (data) => data.data.data,
  })
}

const fetchUsersById = async ({ userId }: { userId: string | undefined }) => {
  const response = await httpClient.get<GlobalResponse<UserInfo>>(
    `${API_LIST.user.all}/${userId}`,
  )
  return response
}

const useFetchUsersById = ({ userId }: { userId: string | undefined }) => {
  return useQuery({
    queryKey: [API_LIST.user.all, userId],
    queryFn: () => fetchUsersById({ userId }),
    select: (data) => data.data.data,
    enabled: !!userId,
  })
}

const updateBanStatus = async ({
  userId,
  payload,
}: {
  userId: string
  payload: { isBanned: boolean }
}) => {
  await httpClient.put(`${API_LIST.user.all}/${userId}`, payload)
}

const useUpdateBanStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBanStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [API_LIST.user.all] }),
  })
}

export { useFetchAllUsers, useFetchUsersById, useUpdateBanStatus }
