import TestListing from './listing.json'
import ListingCard from './card/ListingCard'
import type { Category } from '@/types/global'

const Listing = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-x-4 gap-y-10 my-8">
      {TestListing.map((listing) => (
        <ListingCard
          key={listing.id}
          {...listing}
          category={listing.category as Category} // TODO: Remove this in future. Type assertion used due to type issue from json
        />
      ))}
    </div>
  )
}

export default Listing
