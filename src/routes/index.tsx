import Listing from '@/features/listing'
import ListingFilter from '@/features/listing/filter/ListingFilter'
import type { Category } from '@/types/global'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export type FilterType = Category | 'all'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>('all')
  return (
    <div>
      <div className="app-container">
        <div className="flex justify-center pb-3 mb-3 sticky top-[90px] bg-white z-10">
          <ListingFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <Listing selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}
