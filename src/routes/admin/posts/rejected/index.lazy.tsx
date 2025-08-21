import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/posts/rejected/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
