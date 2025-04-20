import { createFileRoute } from '@tanstack/react-router'
import Landing from '@/features/ui/Landing/Landing'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <Landing />
}
