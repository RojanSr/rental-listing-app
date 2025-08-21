import { UserList } from '@/features/admin/users'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/users/manage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <p className="p-8 font-semibold text-lg text-neutral-700">Manage Users</p>
      <UserList />
    </>
  )
}
