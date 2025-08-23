import { useReviewProperty } from '@/api/services/app/posts/mutation'
import { SuccessModal } from '@/components/feedback'
import { CustomAlertDialog } from '@/components/feedback/CustomAlertDialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PropertyStatus } from '@/enums/post'
import { useNavigate } from '@tanstack/react-router'
import { CheckIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

export const AdminPostAction = ({
  from,
  postId,
}: {
  from: 'pending' | 'approved'
  postId: string
}) => {
  const [successModal, setSuccessModal] = useState({
    open: false,
    message: '',
  })
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')

  const navigate = useNavigate()

  const { mutateAsync: reviewProperty } = useReviewProperty()

  const handleConfirmClick = async (action: PropertyStatus) => {
    await reviewProperty({
      postId,
      payload: {
        propertyStatus: action,
        rejectionReason: action === PropertyStatus.Rejected ? reason : '',
      },
    })
    setOpen(false)
    setSuccessModal({
      open: true,
      message:
        action === PropertyStatus.Approved
          ? 'Post has been approved'
          : 'Post has been rejected',
    })
  }

  return (
    <div className="flex items-center justify-between gap-4 mx-40 my-4 ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="hstack gap-2 px-48 text-lg bg-transparent shadow-none font-normal hover:bg-neutral-100 text-red-500">
            <div>
              <XIcon style={{ width: '22px', height: '22px' }} />
            </div>
            Reject
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reject Item</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleConfirmClick(PropertyStatus.Rejected)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {from === 'pending' && (
        <CustomAlertDialog
          title="Approve post?"
          onConfirm={() => handleConfirmClick(PropertyStatus.Approved)}
        >
          <Button className="hstack gap-2 px-48 text-lg bg-transparent shadow-none font-normal hover:bg-neutral-100 text-green-500">
            <div>
              <CheckIcon
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
            </div>
            Approve
          </Button>
        </CustomAlertDialog>
      )}
      <SuccessModal
        open={successModal.open}
        onClose={() => navigate({ to: '/admin/posts/pending' })}
        message={successModal.message}
      />
    </div>
  )
}
