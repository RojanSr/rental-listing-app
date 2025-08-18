import { cn } from '@/lib/utils'
import type { PostCommonProps } from '../types'

export const PostImageGrid = ({ data, className }: PostCommonProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-2 rounded-3xl overflow-hidden',
        className,
      )}
    >
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
  )
}
