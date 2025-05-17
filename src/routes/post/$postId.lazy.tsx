import type { ListingCardType } from '@/features/listing/card/card.types'
import { createLazyFileRoute } from '@tanstack/react-router'
// import DummyImage from '@/assets/testImage.jpg'
import {
  NotepadTextDashedIcon,
  DropletIcon,
  PhoneIcon,
  ShareIcon,
  HeartIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'

export const Route = createLazyFileRoute('/post/$postId')({
  component: RouteComponent,
})

const CONST_DATA: ListingCardType = {
  title: 'Modern Cosy 1-Bedroom Studio in Kathmandu (5)',
  bhk: 2,
  category: 'apartment',
  id: 1,
  imgSrc:
    'https://images.pexels.com/photos/5490300/pexels-photo-5490300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  location: 'Kapan, Kathmandu',
  rate: 30000,
  latitude: 0,
  longitude: 0,
}

function RouteComponent() {
  return (
    <div className="app-container !max-w-[1200px]">
      <div className="hstack justify-between">
        <p className="text-2xl font-medium">{CONST_DATA.title}</p>
        <div className="hstack gap-4 text-sm underline">
          <div className="hstack gap-1 cursor-pointer">
            <ShareIcon size={14} />
            <p>Share</p>
          </div>
          <div className="hstack gap-1 cursor-pointer">
            <HeartIcon size={14} />
            <p>Save</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 rounded-3xl overflow-hidden mt-4">
        <div className="col-span-2 row-span-2 aspect-square">
          <img src={CONST_DATA.imgSrc} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={CONST_DATA.imgSrc} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={CONST_DATA.imgSrc} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={CONST_DATA.imgSrc} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={CONST_DATA.imgSrc} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mb-4 mt-3">
        <div className="flex justify-between">
          <div>
            <p className="text-lg">{CONST_DATA.location}</p>
            <div className="hstack gap-1 text-sm">
              <p className="capitalize">{CONST_DATA.category}</p>
              <p>•</p>
              <p>{CONST_DATA.bhk} bedroom</p>
              <p>•</p>
              <p>1 hall</p>
              <p>•</p>
              <p>1 kitchen</p>
            </div>
          </div>
          <p className="text-2xl font-medium">
            Rs. {CONST_DATA.rate}{' '}
            <span className="text-[16px] font-normal">per month</span>{' '}
          </p>
        </div>
      </div>

      <div className="hstack gap-3">
        <Avatar className="w-[35px] h-[35px]">
          <AvatarImage src={NoAvatarSVG} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <p className="text-sm font-medium">Posted by John Doe</p>
          <p>8 days ago</p>
        </div>
      </div>

      <div className="grid grid-cols-[fit-content(100%)_fit-content(100%)] gap-y-4 gap-x-4 w-fit py-8 border-y mt-8 border-y-neutral-300">
        <PhoneIcon size={26} />
        <p>+977 9838423487</p>
        <DropletIcon size={26} />
        <p>24/7</p>
        <NotepadTextDashedIcon size={26} />
        <p>
          Modern Studio in Central Kathmandu | Rooftop, Kitchenette & Self
          Check-In Stay in a stylish, European-inspired studio in central
          Kathmandu—ideal for solo travelers, couples, or business guests. Enjoy
          a king-size bed, private bathroom, and a kitchenette with fridge,
          microwave, spices, and cooking essentials.
        </p>
      </div>
    </div>
  )
}
