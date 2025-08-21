import { PendingList } from '@/features/admin/posts'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/posts/pending/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <p className="p-8">Approval Pending List</p>
      <PendingList />
    </>
  )
}
