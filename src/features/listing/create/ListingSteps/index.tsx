import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { ListingCardType } from '@/types'
import { LISTING_CARD_DEFAULT_VALUES } from '@/constants/defaults'
import { StepPilot } from './StepPilot'
import { StepCategory } from './StepCategory'
import { StepLocation } from './StepLocation'
import { StepUploadImages } from './StepUploadImages'
import { StepDescription } from './StepDescription'
import { AnimatePresence, motion } from 'framer-motion'
import { useAddProperty } from '@/api/services/app/posts/mutation'
import { FormProvider, useForm } from 'react-hook-form'

// form values: we store files in `images: File[]`
export type ListingFormValues = Omit<ListingCardType, 'photos'> & {
  images: File[] // files to upload
}

const defaultValues: ListingFormValues = {
  ...LISTING_CARD_DEFAULT_VALUES,
  images: [],
}

const steps = [
  StepPilot,
  StepCategory,
  StepLocation,
  StepUploadImages,
  StepDescription,
]

const ListingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const methods = useForm<ListingFormValues>({
    defaultValues,
    mode: 'onChange',
  })
  const { handleSubmit, watch } = methods

  console.log(watch())

  const Step = steps[currentStep]

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const { mutate: addProperty } = useAddProperty()

  const onSubmit = (values: ListingFormValues) => {
    const formData = new FormData()

    // append scalar fields
    formData.append('purpose', String(values.purpose))
    formData.append('roomCategory', String(values.roomCategory))
    formData.append('description', values.description)
    formData.append('shortDescription', values.shortDescription)
    formData.append('numberOfRoom', String(values.numberOfRoom))
    formData.append('address', values.address)
    formData.append('longitude', String(values.longitude))
    formData.append('latitude', String(values.latitude))
    formData.append('price', String(values.price))
    formData.append('priceUnitLabel', values.priceUnitLabel)
    // append files
    values.images.forEach((file) => {
      formData.append('rentalImages', file)
    })

    console.log(formData, 'formData')

    addProperty(formData)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-[70dvh] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute w-full h-full"
            >
              <Step />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mx-12 mb-24">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="font-normal text-md bg-transparent text-black underline shadow-none"
            type="button"
          >
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              // onClick={async () => {
              //   // optional per-step validation: trigger validations for each step's fields
              //   const ok = await methods.trigger() // triggers all validations (or pass field names)
              //   if (ok) setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
              // }}
              onClick={nextStep}
              className="font-normal px-8 text-md"
              type="button"
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="font-normal px-8 text-md">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default ListingSteps
