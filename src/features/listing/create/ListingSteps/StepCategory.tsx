import { CATEGORY_TO_NEPALI, IconMapping } from '@/constants'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'
import type { LucideIcon } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { ListingFormValues } from '.'

const StructureCard = ({
  icon: Icon,
  category,
}: {
  icon: LucideIcon
  category: Category
}) => {
  const { setValue, control } = useFormContext<ListingFormValues>()
  const roomCategory = useWatch({ control, name: 'roomCategory' })
  return (
    <button
      type="button"
      className={cn(
        'border-2 border-neutral-200 rounded-lg cursor-pointer px-4 py-4 flex flex-col items-center w-[200px]',
        { 'border-black': roomCategory === category },
      )}
      onClick={() => setValue('roomCategory', category)}
    >
      <Icon size={32} />
      <span className="text-lg font-normal capitalize">{category}</span>
      <span className="text-lg font-normal capitalize">
        ({CATEGORY_TO_NEPALI[category]})
      </span>
    </button>
  )
}

export const StepCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">
        Which of these best describe your place?
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {(Object.keys(IconMapping) as Category[]).map((category) => {
          return (
            <StructureCard
              key={category}
              category={category}
              icon={IconMapping[category]}
            />
          )
        })}
      </div>
    </div>
  )
}
