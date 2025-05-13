import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/post/$postId"!</div>
}
