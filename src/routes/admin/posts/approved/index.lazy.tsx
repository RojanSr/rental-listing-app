import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/posts/approved/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
