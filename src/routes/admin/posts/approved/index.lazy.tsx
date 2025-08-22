import { PageWrapper } from '@/components/ui/page-wrapper'
import { PropertyStatus } from '@/enums/post'
import { AdminPostList } from '@/features/admin/posts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/posts/approved/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageWrapper>
      <p className="p-8 font-semibold text-lg text-neutral-700">
        Approved List
      </p>
      <AdminPostList propertyStatus={PropertyStatus.Approved} />
    </PageWrapper>
  )
}
