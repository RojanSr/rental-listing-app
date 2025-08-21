import { UserEnum } from '@/enums/user'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  loader: ({ context: { user } }) => {
    const isSuperAdmin = user && user.role === UserEnum.SuperAdmin
    throw redirect({
      to: isSuperAdmin ? '/admin/posts/pending' : '/',
    })
  },
})
