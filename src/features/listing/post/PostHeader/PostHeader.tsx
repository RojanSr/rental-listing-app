import { CopyIcon, HeartIcon, ShareIcon } from 'lucide-react'
import type { PostCommonProps } from '../types'
import { cn, copyToClipboard } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SharePopover = () => {
  const currentURL = window.location.href
  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        className="border-2 border-neutral-600 rounded-lg px-3 py-1 text-sm"
        defaultValue={currentURL}
        readOnly
      />
      <Button
        size={'icon'}
        className="bg-theme text-neutral-300 px-4 cursor-pointer"
        onClick={() => copyToClipboard(currentURL)}
      >
        <CopyIcon />
      </Button>
    </div>
  )
}

export const PostHeader = ({ data, className }: PostCommonProps) => {
  return (
    <div className={cn('hstack justify-between', className)}>
      <p className="text-2xl font-medium">{data.shortDescription}</p>
      <div className="hstack gap-4 text-sm underline">
        <Popover>
          <PopoverTrigger asChild>
            <div className="hstack gap-1 cursor-pointer">
              <ShareIcon size={14} />
              <p>Share</p>
            </div>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[400px]"
          >
            <SharePopover />
          </PopoverContent>
        </Popover>
        <div className="hstack gap-1 cursor-pointer">
          <HeartIcon size={14} />
          <p>Save</p>
        </div>
      </div>
    </div>
  )
}
