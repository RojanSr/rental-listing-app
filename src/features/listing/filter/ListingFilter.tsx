import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconMapping } from '@/constants'
import { CONST_CATEGORIES } from '@/constants/global'
import { cn } from '@/lib/utils'
import type { FilterType } from '@/routes'
import { StoreIcon } from 'lucide-react'

const CONST_FILTER_CATEGORIES: FilterType[] = ['all', ...CONST_CATEGORIES]

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
          {(CONST_FILTER_CATEGORIES as FilterType[]).map((category) => {
            const Icon = category === 'all' ? StoreIcon : IconMapping[category]
            return (
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
                <Icon />
                <p>{category}</p>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default ListingFilter
