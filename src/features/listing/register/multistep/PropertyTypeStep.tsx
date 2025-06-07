import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ShedRegisterCommonProps } from './types'
import type { Category } from '@/types/global'
import { CONST_CATEGORIES } from '@/constants'

const PropertyTypeStep = ({
  formData,
  setFormData,
}: ShedRegisterCommonProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Property Type</h2>
        <RadioGroup
          value={formData.roomCategory}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              roomCategory: value as Category,
            }))
          }
          className="grid grid-cols-2 gap-4 pt-2"
        >
          {CONST_CATEGORIES.map((type) => (
            <div key={type} className="relative">
              <RadioGroupItem value={type} id={type} className="peer sr-only" />
              <Label
                htmlFor={type}
                className="flex flex-col capitalize items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-theme [&:has([data-state=checked])]:border-theme"
              >
                <span className="text-base">{type}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default PropertyTypeStep
