import Listing from '@/features/listing'
import ListingFilter from '@/features/listing/filter/ListingFilter'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import type { Category } from '@/types'
import { UserEnum } from '@/enums/user'
import { PageWrapper } from '@/components/ui/page-wrapper'

export type FilterType = Category | 'all'

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context: { user } }) => {
    if (user?.role === UserEnum.SuperAdmin) {
      throw redirect({ to: '/admin' })
    }
  },
})

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>('all')
  return (
    <PageWrapper>
      <div className="app-container">
        <div className="flex justify-center pb-3 mb-3 sticky top-[90px] bg-white z-10">
          <ListingFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <Listing selectedCategory={selectedCategory} />
      </div>
    </PageWrapper>
  )
}
