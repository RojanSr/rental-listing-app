import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import { failToast } from '@/lib/toaster'
import type { GlobalResponse } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const addProperty = async (payload: FormData) => {
  try {
    await httpClient.post(API_LIST.property.create, payload)
  } catch (err) {
    const error = err as AxiosError<GlobalResponse<null>, unknown>
    failToast({
      title: 'Error Occured',
      description: error.response?.data?.message || 'Something went wrong',
    })
    throw error
  }
}

const useAddProperty = () => {
  return useMutation({
    mutationFn: addProperty,
  })
}

const deleteProperty = async ({ postId }: { postId: string }) => {
  await httpClient.delete(`${API_LIST.property.all}/${postId}`)
}

const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [API_LIST.property.all],
        exact: false,
      }),
  })
}

export { useAddProperty, useDeleteProperty }
