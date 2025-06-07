import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNavigate } from '@tanstack/react-router'
import { failToast } from '@/lib/toaster'
import { Checkbox } from '@/components/ui/checkbox'

export function TermsDialog() {
  const [open, setOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState<boolean>(false)
  const navigate = useNavigate()

  // Show dialog when component mounts
  useEffect(() => {
    // Check if user has already accepted terms
    const hasAcceptedTerms = localStorage.getItem('acceptedTerms')
    if (!hasAcceptedTerms) {
      setOpen(true)
    }
  }, [])

  const handleAgree = () => {
    // Save acceptance to localStorage
    localStorage.setItem('acceptedTerms', 'true')
    setOpen(false)
  }

  const handleDisagree = () => {
    // Navigate away - in this case to the homepage
    navigate({ to: '/' })
    failToast({ title: 'Terms & condition disagreed' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read and accept our terms and conditions to continue.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] mt-4 p-4 rounded-md border">
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">1. Introduction</h3>
            <p>
              Welcome to our property listing service. By using this service,
              you agree to comply with and be bound by the following terms and
              conditions. Please review them carefully.
            </p>

            <h3 className="font-semibold">2. Property Listings</h3>
            <p>
              2.1. All information provided in property listings must be
              accurate and truthful.
            </p>
            <p>
              2.2. You must have the legal right to list any property you
              submit.
            </p>
            <p>
              2.3. Images uploaded must be of the actual property being listed.
            </p>

            <h3 className="font-semibold">3. User Conduct</h3>
            <p>
              3.1. You agree not to use this service for any illegal or
              unauthorized purpose.
            </p>
            <p>
              3.2. You agree not to post any content that is offensive,
              discriminatory, or violates the rights of others.
            </p>

            <h3 className="font-semibold">4. Privacy</h3>
            <p>
              4.1. We collect and process personal information as described in
              our Privacy Policy.
            </p>
            <p>
              4.2. By using this service, you consent to the collection and use
              of your information as described.
            </p>

            <h3 className="font-semibold">5. Liability</h3>
            <p>
              5.1. We do not guarantee the accuracy of any listing information.
            </p>
            <p>
              5.2. We are not responsible for any transactions or agreements
              made between users.
            </p>

            <h3 className="font-semibold">6. Termination</h3>
            <p>
              6.1. We reserve the right to terminate or suspend your access to
              our service at any time, without notice, for any reason.
            </p>

            <h3 className="font-semibold">7. Changes to Terms</h3>
            <p>
              7.1. We may modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the modified
              terms.
            </p>

            <h3 className="font-semibold">8. Governing Law</h3>
            <p>
              8.1. These terms shall be governed by and construed in accordance
              with applicable laws.
            </p>
          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={isAgreed}
            onCheckedChange={(checked) => setIsAgreed(checked ? true : false)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            variant={'ghost'}
            className="text-red-500"
            onClick={handleDisagree}
          >
            I Disagree
          </Button>
          <Button onClick={handleAgree} disabled={!isAgreed}>
            I Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
