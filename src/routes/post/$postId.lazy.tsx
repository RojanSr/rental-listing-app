import { createLazyFileRoute } from '@tanstack/react-router'
import PostViewById from '@/features/listing/post/PostViewById'

export const Route = createLazyFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()

  return <PostViewById postId={postId} />
}
