import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search/')({
  validateSearch: (search) => {
    return {
      query: search.query ? String(search.query) : '',
      lat: search.lat ? Number(search.lat) : undefined,
      lon: search.lon ? Number(search.lon) : undefined,
    }
  },
  pendingComponent: () => <div>Loading search results...</div>,
})
