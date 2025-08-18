import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'
import type { ListingFormValues } from '.'

export const StepDescription = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<ListingFormValues>()

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="text-3xl font-semibold">Description & Pricing</p>
        <p className="text-neutral-700 text-md">
          Provide a clear and detailed description of your shed along with its
          pricing
        </p>
      </div>

      <div className="w-[500px] mt-8">
        <Label className="mt-2 text-md mb-1" htmlFor="shortDescription">
          Title
        </Label>
        <Input
          id="shortDescription"
          placeholder="Add Title"
          {...register('shortDescription', {
            required: 'Title is required',
            minLength: {
              value: 20,
              message: 'Title must be at least 20 characters',
            },
            maxLength: {
              value: 64,
              message: 'Title must be at most 64 characters',
            },
          })}
        />
        {/* error message */}
        {errors.shortDescription?.message && (
          <p role="alert" className="text-sm text-red-600 mt-2">
            {errors.shortDescription.message}
          </p>
        )}
        <Label className="mt-2 text-md mb-1" htmlFor="description">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Share something about this place"
          {...register('description', { required: true })}
        />
        <Label className="mt-2 text-md mb-1" htmlFor="address">
          Address
        </Label>
        <Input
          id="addressemail"
          placeholder="Address"
          defaultValue={getValues('address') || ''}
          {...register('address', { required: true })}
        />
        <div className="flex items-center gap-2 mt-2 mb-1">
          <Label className="whitespace-nowrap text-md" htmlFor="numberOfRoom">
            Number of Rooms
          </Label>
          <Input
            id="numberOfRoom"
            placeholder="Number of Rooms"
            type="number"
            {...register('numberOfRoom', { required: true })}
          />
        </div>
        <div className="flex items-center gap-2 mt-2 mb-1">
          <Label className="whitespace-nowrap text-md" htmlFor="price">
            Rental Price (per month)
          </Label>
          <Input
            id="price"
            placeholder="Enter price"
            type="number"
            {...register('price', { required: true })}
          />
        </div>
      </div>
    </div>
  )
}
