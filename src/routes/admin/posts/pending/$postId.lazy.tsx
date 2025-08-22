import { PageWrapper } from '@/components/ui/page-wrapper'
import { AdminPostAction } from '@/features/admin/posts'
import PostViewById from '@/features/listing/post/PostViewById'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/admin/posts/pending/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()

  return (
    <PageWrapper>
      <div className="my-8">
        <div className="mx-12 mb-8 rounded-full hover:bg-neutral-100 w-fit">
          <Link to="/admin/posts/pending">
            <ChevronLeftIcon size={32} />
          </Link>
        </div>
        <PostViewById postId={postId} />
        <AdminPostAction from={'pending'} postId={postId} />
      </div>
    </PageWrapper>
  )
}
