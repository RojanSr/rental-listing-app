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
import { SuccessModal } from '@/components/feedback'
import { useNavigate } from '@tanstack/react-router'

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
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const methods = useForm<ListingFormValues>({
    defaultValues,
    mode: 'onChange',
  })
  const { handleSubmit } = methods

  const Step = steps[currentStep]

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const { mutateAsync: addProperty } = useAddProperty()

  const onSubmit = async (values: ListingFormValues) => {
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

    await addProperty(formData)
    setOpen(true)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[70dvh] z-0 relative">
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

          <div className="flex justify-between items-center mx-12 mb-24 relative z-10">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="font-normal text-md cursor-pointer bg-transparent text-black underline shadow-none hover:bg-transparent"
              type="button"
            >
              Back
            </Button>

            <Button
              onClick={nextStep}
              type="button"
              className={`font-normal cursor-pointer px-8 text-md ${currentStep === steps.length - 1 ? 'hidden' : ''}`}
            >
              Next
            </Button>

            <Button
              type="submit"
              className={`font-normal cursor-pointer px-8 text-md ${currentStep < steps.length - 1 ? 'hidden' : ''}`}
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
      <SuccessModal
        open={open}
        onClose={() => {
          navigate({ to: '/' })
          setOpen(false)
        }}
        message="Your property has been sent for a review"
      />
    </>
  )
}

export default ListingSteps
