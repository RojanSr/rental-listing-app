import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DialogProps } from '@radix-ui/react-dialog'

const AuthDialog = ({ open, onOpenChange }: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Log in or sign up</DialogTitle>
          <DialogDescription className="text-black border-t-2 py-4 border-t-zinc-300">
            <p className="text-xl font-medium">Welcome to BasooBas.com</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
