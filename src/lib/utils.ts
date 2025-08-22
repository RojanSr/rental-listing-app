import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'
import type { UserEnum } from '@/enums/user'
import { PropertyStatus } from '@/enums/post'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function deleteProp<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> {
  const { [key]: _, ...rest } = obj
  return rest
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

export const getUserRole = (role: UserEnum) => {
  switch (role) {
    case 0:
      return 'Super Admin'
    case 1:
      return 'Lister'
    case 2:
      return 'User'
  }
}

export const getPropertyStatusLabel = (status: PropertyStatus) => {
  switch (status) {
    case 1:
      return 'Pending'
    case 2:
      return 'Approved'
    case 3:
      return 'Rejected'
  }
}
