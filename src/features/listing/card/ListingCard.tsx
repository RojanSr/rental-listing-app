import { Badge } from '@/components/ui/badge'
import type { ListingCardType } from './card.types'

const ListingCard = ({
  imgSrc,
  location,
  title,
  rate,
  category,
  bhk,
}: ListingCardType) => {
  return (
    <div className="cursor-pointer select-none hover:brightness-90 transition-all duration-300 border border-black/10 shadow-[0px_0px_2px_rgba(0,0,0,0.075)] rounded-xl hover:bg-neutral-50">
      <img
        src={imgSrc}
        alt="Couldn't load the image"
        className="w-full aspect-[1.6/1] rounded-t-lg object-cover object-center"
        draggable={false}
      />
      <div className="py-2 px-4 text-sm text-neutral-700">
        <p className="text-[1rem] font-medium text-ellipsis overflow-hidden whitespace-nowrap text-black">
          {title}
        </p>
        <p className="text-sm ">{location}</p>
        <div className="flex items-center flex-wrap gap-1 my-2">
          <Badge className="bg-theme px-2 py-1 rounded-3xl min-w-[6ch] capitalize">
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
  )
}

export default ListingCard
