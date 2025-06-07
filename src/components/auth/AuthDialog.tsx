import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DialogProps } from '@radix-ui/react-dialog'
import type { AuthDialogState } from './auth'
import SignupForm from './form/SignupForm'
import LoginForm from './form/LoginForm'

type AuthDialogProps = {
  authDialogOpen: AuthDialogState
  toggleAuthDialog: React.Dispatch<React.SetStateAction<AuthDialogState>>
}

const AuthDialog = ({
  authDialogOpen,
  onOpenChange,
  toggleAuthDialog,
}: DialogProps & AuthDialogProps) => {
  const CONST_LABEL =
    authDialogOpen.authType === 'signup' ? 'Sign up' : 'Log in'
  return (
    <Dialog open={authDialogOpen.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lgfont-medium">
            {CONST_LABEL}
          </DialogTitle>
          <DialogDescription className="text-black border-t-2 py-4 border-t-zinc-300">
            <span className="text-xl font-medium">Welcome to GharBaas.com</span>
          </DialogDescription>
        </DialogHeader>
        {authDialogOpen.authType === 'signup' ? (
          <SignupForm toggleAuthDialog={toggleAuthDialog} />
        ) : (
          <LoginForm />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
