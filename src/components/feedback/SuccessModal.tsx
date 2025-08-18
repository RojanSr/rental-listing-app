import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type SuccessModalProps = {
  open: boolean
  onClose: () => void
  message: string
  autoCloseMs?: number // optional auto-close timer
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  message,
  autoCloseMs = 3000,
}) => {
  // optional auto close
  useEffect(() => {
    if (open && autoCloseMs) {
      const timer = setTimeout(onClose, autoCloseMs)
      return () => clearTimeout(timer)
    }
  }, [open, autoCloseMs, onClose])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <AnimatePresence>
        {open && (
          <DialogContent className="max-w-sm rounded-2xl border-none bg-white shadow-xl p-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >
              <CheckCircle2 className="w-14 h-14 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Success!
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <Button className="w-full rounded-xl" onClick={onClose}>
                Close
              </Button>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
