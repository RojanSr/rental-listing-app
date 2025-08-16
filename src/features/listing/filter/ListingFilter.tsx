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
        <TabsList>
          {(CONST_FILTER_CATEGORIES as FilterType[]).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={cn(
                'flex items-center gap-3 capitalize cursor-pointer text-neutral-800 px-6 transition-none',
                {
                  '!bg-theme text-neutral-300': selectedCategory === category,
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
