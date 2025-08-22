import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import type { PostCommonProps } from '../types'
import { MailIcon, NotepadTextDashedIcon, PhoneIcon } from 'lucide-react'

export const PostBody = ({ data }: PostCommonProps) => {
  const {
    address,
    numberOfRoom,
    latitude,
    longitude,
    roomCategory,
    price,
    description,
    user,
  } = data
  return (
    <>
      <div className="mb-4 mt-3">
        <div className="flex justify-between">
          <div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
              target="_blank"
            >
              <p className="text-lg hover:underline">{address}</p>
            </a>
            <div className="hstack gap-1 text-sm">
              <p className="capitalize">{roomCategory}</p>
              <p>•</p>
              <p>{`${numberOfRoom} Room${numberOfRoom ? 's' : ''}`}</p>
            </div>
          </div>
          <p className="text-2xl font-medium">
            Rs. {price}{' '}
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
          <p className="text-sm">
            Posted by{' '}
            <span className="capitalize font-medium">{user.fullName}</span>
          </p>
          <p>Just now</p>
        </div>
      </div>

      <div className="grid grid-cols-[fit-content(100%)_fit-content(100%)] gap-y-4 gap-x-4 py-8 border-y mt-8 border-y-neutral-300 w-full">
        <NotepadTextDashedIcon size={26} />
        <p>{description}</p>
        <PhoneIcon size={26} />
        <p>+977 {user.contactNumber}</p>
        <MailIcon size={26} />
        <p>{user.email}</p>
      </div>
    </>
  )
}
