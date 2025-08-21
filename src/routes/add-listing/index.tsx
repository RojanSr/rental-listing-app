import { UserEnum } from '@/enums/user'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/add-listing/')({
  loader: ({ context: { user } }) => {
    if (!user || user.role !== UserEnum.Admin) {
      throw redirect({
        to: '/',
      })
    }
  },
})
