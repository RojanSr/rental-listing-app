import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import { Avatar } from '@/components/ui/avatar'
import { cn, getUserRole } from '@/lib/utils'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useFetchUsersById } from '@/api/services/app/users/queries'
import { formatDate, timeAgo } from '@/lib/formatter'
import type { DivClassName } from '@/types'

const InfoGridItem = ({
  label,
  content,
}: {
  label: string
  content: string
}) => {
  return (
    <div>
      <p className="text-sm font-medium text-theme">{label}</p>
      <p className="text-md font-normal">{content}</p>
    </div>
  )
}

export const MyInfo = ({
  profileId,
  className,
}: {
  profileId: string
  className?: DivClassName
}) => {
  const { data: userInfo, isLoading: isUserInfoLoading } = useFetchUsersById({
    userId: profileId,
  })
  if (!userInfo || isUserInfoLoading) return <></>

  return (
    <div className={cn('flex flex-wrap gap-6 text-neutral-700', className)}>
      <div className="flex-1 flex flex-col items-center rounded-2xl py-4 px-6 border border-neutral-200">
        <p className="capitalize font-medium text-2xl">{userInfo.fullName}</p>
        <p className="capitalize font-normal text-md text-theme italic">
          {getUserRole(userInfo.role)}
        </p>
        <Avatar className="w-[220px] h-[220px]">
          <AvatarImage src={NoAvatarSVG} alt={`${userInfo.fullName} profile`} />
        </Avatar>
      </div>
      <div className="flex-1/3 rounded-2xl p-6 border border-neutral-200">
        <p className="text-lg font-medium">Personal Information</p>
        <div className="grid grid-cols-2 px-8 py-4 gap-4">
          <InfoGridItem content={userInfo.address} label="Address" />
          <InfoGridItem
            content={userInfo.contactNumber}
            label="Contact Number"
          />
          <InfoGridItem content={userInfo.email} label="Email" />
          <InfoGridItem
            content={formatDate(userInfo.createdAt)}
            label="Created Date"
          />
          <InfoGridItem
            content={timeAgo(userInfo.updatedAt)}
            label="Last Updated"
          />
        </div>
      </div>
    </div>
  )
}
