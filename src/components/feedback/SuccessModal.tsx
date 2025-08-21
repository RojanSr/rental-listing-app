import { CircleCheckIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type SuccessModalProps = {
  open: boolean
  onClose: () => void
  message: string
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <AnimatePresence>
        {open && (
          <DialogContent className="w-sm rounded-2xl border-none bg-white shadow-xl p-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="bg-emerald-50 p-4 mb-2 rounded-3xl">
                <CircleCheckIcon className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-800">Success</h2>
              <p className="text-sm text-gray-600 mb-6">{message}</p>

              <Button
                className="w-full rounded-xl bg-emerald-500 border-2 border-emerald-500 hover:bg-emerald-400 hover:border-emerald-400"
                onClick={onClose}
              >
                Confirm
              </Button>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
