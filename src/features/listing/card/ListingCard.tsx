import { Badge } from '@/components/ui/badge'
import type { ListingCardType } from './card.types'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const ListingCard = ({
  id,
  imgSrc,
  location,
  title,
  rate,
  category,
  bhk,
  orientation,
}: ListingCardType) => {
  return (
    <Link to="/post/$postId" params={{ postId: id?.toString() }}>
      <div
        className={cn(
          'group cursor-pointer select-none border border-black/10 shadow-[0px_0px_2px_rgba(0,0,0,0.075)] rounded-xl transition-all duration-200 hover:bg-neutral-50',
          { flex: orientation === 'horizontal' },
        )}
      >
        <img
          src={imgSrc}
          alt="Couldn't load the image"
          className={cn(
            'w-full aspect-[1.6/1] rounded-t-lg object-cover object-center group-hover:brightness-90',
            {
              'w-80': orientation === 'horizontal',
            },
          )}
          draggable={false}
        />
        <div className="py-2 px-4 text-sm text-neutral-700">
          <p className="text-[1rem] font-medium text-ellipsis overflow-hidden whitespace-nowrap text-black">
            {title}
          </p>
          <p className="text-sm">{location}</p>
          <div className="flex items-center flex-wrap gap-1 my-2">
            <Badge className="border border-theme bg-theme/10 text-theme px-2 py-1 rounded-3xl min-w-[6ch] capitalize">
              {category}
            </Badge>
            <Badge
              variant={'outline'}
              className="px-2 py-1 rounded-3xl min-w-[6ch] capitalize"
            >
              {bhk}BHK
            </Badge>
          </div>
          <p className="text-sm">
            <span className="font-medium text-lg text-neutral-800">
              Rs. {rate}
            </span>{' '}
            <span className="">per month</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard
