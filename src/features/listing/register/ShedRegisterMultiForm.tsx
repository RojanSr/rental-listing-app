import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Stepper } from '@/components/ui/stepper'
import PropertyTypeStep from './multistep/PropertyTypeStep'
import PropertyInfoStep from './multistep/PropertyInfoStep'
import AdditionalInfoStep from './multistep/AdditionalInfoStep'
import type { RegisterFormData } from './multistep/types'
import { useNavigate } from '@tanstack/react-router'
import { useAddProperty } from '@/api/services/app/posts/mutation'

const ShedRegisterMultiForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<RegisterFormData>({
    roomCategory: 'room',
    shortDescription: '',
    description: '',
    address: '',
    price: 0,
    images: {
      rentalImages: [],
      src: [],
    },
    latitude: null,
    longitude: null,
    numberOfRoom: 0,
  })

  const { mutateAsync: addProperty } = useAddProperty()

  const steps = ['Select Property Type', 'Property Info', 'Additional Info']

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { images, ...restPayload } = formData

    const formDataToSend = new FormData()

    for (const key in restPayload) {
      const value = (restPayload as any)[key]
      if (typeof value !== 'undefined' && value !== null) {
        formDataToSend.append(key, String(value))
      }
    }

    images.rentalImages.forEach((file) => {
      formDataToSend.append('rentalImages', file) // backend should expect "rentalImages"
    })

    addProperty(formDataToSend).then(() => navigate({ to: '/' }))
  }
  return (
    <div>
      <Stepper steps={steps} currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Property Type */}
            {currentStep === 0 && (
              <PropertyTypeStep setFormData={setFormData} formData={formData} />
            )}

            {/* Step 2: Property Info */}
            {currentStep === 1 && (
              <PropertyInfoStep formData={formData} setFormData={setFormData} />
            )}

            {/* Step 3: Additional Info */}
            {currentStep === 2 && (
              <AdditionalInfoStep
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-theme text-white px-6 rounded-lg cursor-pointer hover:bg-theme/80 font-medium text-sm"
                  disabled={currentStep === 0 && !formData.roomCategory}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <Button
                  type="submit"
                  className="bg-theme hover:bg-theme/80 cursor-pointer"
                >
                  Submit Listing
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShedRegisterMultiForm
