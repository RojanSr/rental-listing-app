import ListingCard from './card/ListingCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import EmptySvg from '@/assets/empty.svg'
import { Link } from '@tanstack/react-router'
import { useFetchApprovedProperties } from '@/api/services/app/posts/queries'
import type { FilterType } from '@/routes'
import type { ListingCardType } from '@/types'

const ListingSkeleton = () => {
  return Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="flex flex-col gap-2">
      <Skeleton className="h-48" />
      <Skeleton className="h-6 w-56" />
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-8 w-46" />
    </div>
  ))
}

const ShowListing = ({ listCards }: { listCards: ListingCardType[] }) => {
  return (
    <AnimatePresence initial={false}>
      {listCards.map((listing) => (
        <motion.div
          key={listing.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/post/$postId" params={{ postId: listing.id?.toString() }}>
            <ListingCard {...listing} />
          </Link>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

const Listing = ({ selectedCategory }: { selectedCategory: FilterType }) => {
  const { data, isLoading } = useFetchApprovedProperties({
    category: selectedCategory,
  })

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-neutral-600 mt-24 gap-2 select-none">
        <img src={EmptySvg} width={80} draggable={false} />
        <p className="text-md">Nothing Found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(235px,_1fr))] gap-x-4 gap-y-10">
      {isLoading ? <ListingSkeleton /> : <ShowListing listCards={data} />}
    </div>
  )
}

export default Listing
