import { createLazyFileRoute } from '@tanstack/react-router'
import {
  NotepadTextDashedIcon,
  DropletIcon,
  PhoneIcon,
  ShareIcon,
  HeartIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import { useFetchPropertyById } from '@/api/services/app/posts/queries'

export const Route = createLazyFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()

  const { data, isLoading, isError } = useFetchPropertyById({ id: postId })

  if (isLoading) {
    ;<>Loading...</>
  }

  if (!data || isError) {
    return <>Failed to fetch data</>
  }

  return (
    <div className="app-container !max-w-[1200px]">
      <div className="hstack justify-between">
        <p className="text-2xl font-medium">{data.shortDescription}</p>
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
          <img
            src={data.photos[0].photo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square">
          <img
            src={data.photos[0].photo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square">
          <img
            src={data.photos[0].photo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square">
          <img
            src={data.photos[0].photo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square">
          <img
            src={data.photos[0].photo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-4 mt-3">
        <div className="flex justify-between">
          <div>
            <p className="text-lg">{data.address}</p>
            <div className="hstack gap-1 text-sm">
              <p className="capitalize">{data.roomCategory}</p>
              <p>•</p>
              <p>{data.numberOfRoom} bedroom</p>
              <p>•</p>
              <p>1 hall</p>
              <p>•</p>
              <p>1 kitchen</p>
            </div>
          </div>
          <p className="text-2xl font-medium">
            Rs. {data.price}{' '}
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
