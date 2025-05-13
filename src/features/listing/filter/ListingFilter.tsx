import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CONST_CATEGORIES } from '@/constants/global'
import { cn } from '@/lib/utils'
import type { FilterType } from '@/routes'
import type { ReactNode } from '@tanstack/react-router'
import { BedDouble, Building, Building2, House, Store } from 'lucide-react'

const CONST_FILTER_CATEGORIES: FilterType[] = ['all', ...CONST_CATEGORIES]

const IconMapping: Record<FilterType, ReactNode> = {
  all: <Store />,
  room: <BedDouble />,
  apartment: <Building2 />,
  flat: <Building />,
  house: <House />,
}

const ListingFilter = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: FilterType
  setSelectedCategory: React.Dispatch<React.SetStateAction<FilterType>>
}) => {
  return (
    <div>
      <Tabs
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as FilterType)}
      >
        <TabsList
          className="bg-transparent p-0 gap-8"
          style={{
            boxShadow: 'none !important',
          }}
        >
          {(CONST_FILTER_CATEGORIES as FilterType[]).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={cn(
                'relative !shadow-none rounded-none capitalize cursor-pointer flex flex-col h-fit text-theme after:content-[""] after:w-12 after:h-[2px] after:bg-theme after:absolute after:-bottom-1',
                {
                  'after:hidden text-neutral-500 hover:after:block hover:text-theme/70 hover:after:bg-theme/70':
                    selectedCategory !== category,
                },
              )}
            >
              {IconMapping[category]}
              <p>{category}</p>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ListingFilter
