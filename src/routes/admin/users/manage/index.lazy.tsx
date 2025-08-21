import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/users/manage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
