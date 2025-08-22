import { cn } from '@/lib/utils'
import type { DivClassName } from '@/types'
import { UserPostList } from './table'
import { useParams, useRouter } from '@tanstack/react-router'
import type { MyRouterContext } from '@/routes/__root'

export const ProfileListings = ({
  className,
}: {
  className?: DivClassName
}) => {
  const { user } = useRouter().options.context as MyRouterContext
  const { profileId } = useParams({ strict: false })
  const isOwnProfile = profileId === user?.id
  return (
    <div className={cn('border border-neutral-200 rounded-2xl', className)}>
      <p className="text-theme text-lg font-medium">
        {isOwnProfile ? 'My' : 'User'} Listings
      </p>
      <UserPostList />
    </div>
  )
}
