import type { ListingCardType } from '@/types'

const ListingCard = ({
  photos,
  address,
  price,
  roomCategory,
}: ListingCardType) => {
  return (
    <div
      className={
        'cursor-pointer select-none transition-brightness duration-200 hover:brightness-95'
      }
    >
      <img
        src={photos?.[0]?.photo}
        alt="Couldn't load the image"
        className={
          'w-full aspect-square rounded-3xl transition-scale duration-400 object-cover object-center hover:scale-[0.99]'
        }
        draggable={false}
      />
      <div className="px-1 py-1.5 text-sm text-neutral-700">
        <p className="text-[0.88rem] font-medium text-ellipsis overflow-hidden whitespace-nowrap text-black capitalize">
          {roomCategory} in {address}
        </p>
        <p className="text-[0.78rem]">NRs. {price}/mo</p>
      </div>
    </div>
  )
}

export default ListingCard
