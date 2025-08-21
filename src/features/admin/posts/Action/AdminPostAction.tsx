import { useReviewProperty } from '@/api/services/app/posts/queries'
import { SuccessModal } from '@/components/feedback'
import { CustomAlertDialog } from '@/components/feedback/CustomAlertDialog'
import { Button } from '@/components/ui/button'
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

  const navigate = useNavigate()

  const { mutateAsync: reviewProperty } = useReviewProperty({ postId })

  const handleConfirmClick = async (action: PropertyStatus) => {
    await reviewProperty({
      postId,
      payload: {
        propertyStatus: action,
        rejectionReason:
          action === PropertyStatus.Rejected ? 'TODO: Write message here' : '',
      },
    })
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
      <CustomAlertDialog
        title="Reject Post?"
        onConfirm={() => handleConfirmClick(PropertyStatus.Rejected)}
      >
        <Button className="hstack gap-2 px-48 text-lg bg-transparent shadow-none font-normal hover:bg-neutral-100 text-red-500">
          <div>
            <XIcon
              style={{
                width: '22px',
                height: '22px',
              }}
            />
          </div>
          Reject
        </Button>
      </CustomAlertDialog>
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
