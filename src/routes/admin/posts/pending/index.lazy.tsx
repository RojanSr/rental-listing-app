import { PropertyStatus } from '@/enums/post'
import { AdminPostList } from '@/features/admin/posts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/posts/pending/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <p className="p-8 font-semibold text-lg text-neutral-700">
        Approval Pending List
      </p>
      <AdminPostList propertyStatus={PropertyStatus.Pending} />
    </>
  )
}
