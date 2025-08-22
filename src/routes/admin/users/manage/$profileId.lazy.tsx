import { PageWrapper } from '@/components/ui/page-wrapper'
import { UserProfile } from '@/features/profile'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/admin/users/manage/$profileId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { profileId } = Route.useParams()

  return (
    <PageWrapper>
      <div className="app-container mt-4">
        <div className="mx-12 mb-8 rounded-full hover:bg-neutral-100 w-fit">
          <Link to="/admin/users/manage">
            <ChevronLeftIcon size={32} />
          </Link>
        </div>
        <UserProfile profileId={profileId} />
      </div>
    </PageWrapper>
  )
}
