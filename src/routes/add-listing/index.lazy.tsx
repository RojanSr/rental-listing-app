import { createLazyFileRoute } from '@tanstack/react-router'
import ListingSteps from '@/features/listing/create/ListingSteps'

export const Route = createLazyFileRoute('/add-listing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="app-container">
      <ListingSteps />
    </div>
  )
}
