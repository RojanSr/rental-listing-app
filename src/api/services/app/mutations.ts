import API_LIST from '@/api/api_list'
import { httpClient } from '@/api/clients/http-client'
import type { LoginFormData, SignUpFormData } from '@/components/auth/form/type'
import { failToast, successToast } from '@/lib/toaster'
import { TokenService } from '@/lib/TokenService'
import type { GlobalResponse } from '@/types/global'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const initSignUp = async ({
  payload,
  userType,
}: {
  payload: SignUpFormData
  userType: 'admin' | 'user'
}) => {
  try {
    await httpClient.post(
      userType === 'admin' ? API_LIST.admin_sign_up : API_LIST.sign_up,
      payload,
    )
    successToast({
      title: 'User created',
      description: "Congratulations, You're account has been created",
    })
  } catch (err) {
    const error = err as AxiosError<GlobalResponse<null>, unknown>
    failToast({
      title: 'Error Occured',
      description: error.response?.data?.message || 'Something went wrong',
    })
    throw error
  }
}

const useInitSignUp = () => {
  return useMutation({
    mutationFn: initSignUp,
  })
}

const initLogin = async (payload: LoginFormData) => {
  try {
    const response = await httpClient.post<
      GlobalResponse<{
        accessToken: string
        refreshToken: string
      }>
    >(API_LIST.login, payload)

    const tokens = response.data.data

    if (!tokens.accessToken || !tokens.refreshToken) throw Error

    TokenService.setToken({
      key: 'access_token',
      value: tokens.accessToken,
    })
    TokenService.setToken({
      key: 'refresh_token',
      value: tokens.refreshToken,
    })
    successToast({
      title: 'Success',
      description: 'You are logged in',
    })
  } catch (err) {
    const error = err as AxiosError<GlobalResponse<null>, unknown>
    failToast({
      title: 'Error Occured',
      description: error.response?.data?.message || 'Something went wrong',
    })
    throw error
  }
}

const useInitLogin = () => {
  return useMutation({
    mutationFn: initLogin,
  })
}

const addProperty = async (payload: FormData) => {
  try {
    await httpClient.post(API_LIST.property.create, payload)
    successToast({
      title: 'Property added',
      description: "Congratulations, You're property has been added",
    })
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

export { useInitSignUp, useInitLogin, useAddProperty }
