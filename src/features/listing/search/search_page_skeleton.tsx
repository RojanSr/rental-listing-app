import { Skeleton } from '@/components/ui/skeleton'

export const SearchPageSkeleton = () => {
  return (
    <div className="app-container flex gap-4 flex-col md:flex-row">
      <div className="flex-1/12">
        <Skeleton className="w-[350px] h-[40px]" />

        <div className="mt-8 gap-4 flex flex-wrap">
          <Skeleton className="w-[227px] aspect-square" />
          <Skeleton className="w-[227px] aspect-square" />
          <Skeleton className="w-[227px] aspect-square" />
          <Skeleton className="w-[227px] aspect-square" />
          <Skeleton className="w-[227px] aspect-square" />
        </div>
      </div>
      <Skeleton className="h-[30dvh] md:h-[88vh] w-[1000px] rounded-xl" />
    </div>
  )
}
