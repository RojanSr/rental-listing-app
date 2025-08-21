import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/add-listing/')({
  loader: ({ context: { user } }) => {
    if (!user || user.role !== 1) {
      // Redirect if not role 1
      throw redirect({
        to: '/',
      })
    }
  },
})
