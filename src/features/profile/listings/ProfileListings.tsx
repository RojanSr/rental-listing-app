import { cn } from '@/lib/utils'
import type { DivClassName } from '@/types'
import { UserPostList } from './table'

export const ProfileListings = ({
  className,
}: {
  className?: DivClassName
}) => {
  return (
    <div className={cn('border border-neutral-200 rounded-2xl', className)}>
      <p className="text-theme text-lg font-medium">My Listings</p>
      <UserPostList />
    </div>
  )
}
