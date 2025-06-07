import { createLazyFileRoute } from '@tanstack/react-router'
import ShedRegisterMultiForm from '@/features/listing/register/ShedRegisterMultiForm'
import { TermsDialog } from '@/features/listing/register/TermsDialog'

export const Route = createLazyFileRoute('/shed-register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="app-container !max-w-[1000px] my-12">
      <TermsDialog />
      <ShedRegisterMultiForm />
    </div>
  )
}
