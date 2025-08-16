import type { ListingCardType } from './card.types'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const ListingCard = ({
  id,
  imgSrc,
  location,
  rate,
  category,
}: ListingCardType) => {
  return (
    <Link to="/post/$postId" params={{ postId: id?.toString() }}>
      <div
        className={cn(
          'cursor-pointer select-none transition-background duration-200 hover:brightness-90',
        )}
      >
        <img
          src={imgSrc}
          alt="Couldn't load the image"
          className={cn(
            'w-full aspect-square rounded-3xl object-cover object-center ',
          )}
          draggable={false}
        />
        <div className="px-1 py-1.5 text-sm text-neutral-700">
          <p className="text-[0.88rem] font-medium text-ellipsis overflow-hidden whitespace-nowrap text-black capitalize">
            {category} in {location}
          </p>
          {/* <div className="flex items-center flex-wrap gap-1 my-2">
            <Badge className="border border-theme bg-theme/10 text-theme px-2 py-1 rounded-3xl min-w-[6ch] capitalize">
              {category}
            </Badge>
            <Badge
              variant={'outline'}
              className="px-2 py-1 rounded-3xl min-w-[6ch] capitalize"
            >
              {bhk}BHK
            </Badge>
          </div> */}
          <p className="text-[0.78rem]">NRs. {rate}/mo</p>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard
