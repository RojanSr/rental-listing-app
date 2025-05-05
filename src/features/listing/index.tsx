import TestListing from './listing.json'
import ListingCard from './card/ListingCard'

const Listing = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-x-6 gap-y-10 my-8">
      {TestListing.map((listing) => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </div>
  )
}

export default Listing
