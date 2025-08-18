import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import type { PostCommonProps } from '../types'
import { DropletIcon, NotepadTextDashedIcon, PhoneIcon } from 'lucide-react'

export const PostBody = ({ data }: PostCommonProps) => {
  return (
    <>
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

      <div className="grid grid-cols-[fit-content(100%)_fit-content(100%)] gap-y-4 gap-x-4 py-8 border-y mt-8 border-y-neutral-300 w-full">
        <PhoneIcon size={26} />
        <p>+977 9838423487</p>
        <DropletIcon size={26} />
        <p>24/7</p>
        <NotepadTextDashedIcon size={26} />
        <p>{data.description}</p>
      </div>
    </>
  )
}
