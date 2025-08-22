import { PageWrapper } from '@/components/ui/page-wrapper'
import { UserProfile } from '@/features/profile'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile/$profileId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { profileId } = Route.useParams()

  return (
    <PageWrapper>
      <div className="app-container">
        <UserProfile profileId={profileId} />
      </div>
    </PageWrapper>
  )
}
