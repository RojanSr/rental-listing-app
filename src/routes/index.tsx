import Listing from '@/features/listing'
import LandingSearch from '@/features/listing/search/LandingSearch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <LandingSearch />
      <Listing />
    </div>
  )
}
