import type { ListingCardType } from './card.types'

const ListingCard = ({
  imgSrc,
  location,
  postDate,
  postedBy,
  rate,
}: ListingCardType) => {
  return (
    <div className="cursor-pointer">
      <img
        src={imgSrc}
        alt="Couldn't load the image"
        className="w-full aspect-[1.05/1] rounded-3xl object-cover object-center"
      />
      <div className="mt-2">
        <p className="font-semibold text-neutral-900/95">{location}</p>
        <p className="text-neutral-600">Posted by {postedBy}</p>
        <p className="text-neutral-600">{postDate}</p>
        <p className="text-neutral-900/95">
          <span className="font-semibold">NPR {rate}</span>{' '}
          <span className="font-normal text-neutral-600">per month</span>
        </p>
      </div>
    </div>
  )
}

export default ListingCard
