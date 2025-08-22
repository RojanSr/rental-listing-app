import * as React from 'react'
import { cn } from '@/lib/utils'
import type { PostCommonProps } from '../types'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const PostImageGrid = ({ data, className }: PostCommonProps) => {
  const [open, setOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)

  const photos = data.photos

  const handleOpen = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-4 gap-2 rounded-3xl overflow-hidden',
          className,
        )}
      >
        {/* First big image */}
        {photos[0] && (
          <div
            className="col-span-2 row-span-2 aspect-square cursor-pointer"
            onClick={() => handleOpen(0)}
          >
            <img
              src={photos[0].photo}
              className="w-full h-full object-cover"
              alt="post"
            />
          </div>
        )}

        {/* Next up to 4 images */}
        {photos.slice(1, 5).map((photo, index) => {
          const isLast = index === 3 && photos.length > 5
          return (
            <div
              key={photo.id}
              className="aspect-square relative cursor-pointer"
              onClick={() => (isLast ? handleOpen(4) : handleOpen(index + 1))}
            >
              <img
                src={photo.photo}
                className="w-full h-full object-cover"
                alt="post"
              />
              {isLast && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                  +{photos.length - 5}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal / Dialog with Carousel */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl p-0 bg-black overflow-hidden">
          <div className="relative flex items-center justify-center">
            {/* Prev Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 z-10 text-white hover:bg-black/30"
              onClick={handlePrev}
            >
              <ChevronLeft size={28} />
            </Button>

            {/* Image container */}
            <div className="flex items-center justify-center w-full h-[80vh] bg-black">
              <img
                src={photos[currentIndex]?.photo}
                alt="post"
                className="object-contain max-h-full max-w-full min-h-[300px] min-w-[300px]"
              />
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 z-10 text-white hover:bg-black/30"
              onClick={handleNext}
            >
              <ChevronRight size={28} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
