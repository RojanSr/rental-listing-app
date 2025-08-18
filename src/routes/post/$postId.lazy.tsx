import { createLazyFileRoute } from '@tanstack/react-router'
import { useFetchPropertyById } from '@/api/services/app/posts/queries'
import { PostHeader, PostImageGrid } from '@/features/listing/post'
import { PostBody } from '@/features/listing/post/PostBody'

export const Route = createLazyFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()

  const { data, isLoading, isError } = useFetchPropertyById({ id: postId })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data || isError) {
    return <p>Failed to fetch data</p>
  }

  return (
    <div className="app-container !max-w-[1200px]">
      <PostHeader data={data} />
      <PostImageGrid data={data} className="mt-2" />
      <PostBody data={data} />
    </div>
  )
}
