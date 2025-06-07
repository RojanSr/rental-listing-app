import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'

interface StepperProps {
  steps: string[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                index < currentStep
                  ? 'bg-theme border-theme text-theme-foreground'
                  : index === currentStep
                    ? 'border-theme text-theme'
                    : 'border-muted-foreground text-muted-foreground',
              )}
            >
              {index < currentStep ? (
                <CheckIcon className="h-5 w-5 text-white" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={cn(
                'mt-2 text-sm font-medium text-center',
                index === currentStep ? 'text-theme' : 'text-muted-foreground',
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2 mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/30" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-theme transition-all"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
