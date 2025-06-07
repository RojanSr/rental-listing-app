import { toast } from 'sonner'

type CustomToastParams = {
  title?: string
  description?: string
  duration?: number
  style?: React.CSSProperties | undefined
}

const successToast = ({
  title,
  description,
  duration,
  style,
}: CustomToastParams) => {
  return toast(title || 'Success', {
    description,
    duration,
    style: {
      background: '#549c16',
      color: 'white',
      fontSize: '1rem',
      ...style,
    },
    descriptionClassName: '!text-white',
  })
}

const failToast = ({
  title,
  description,
  duration,
  style,
}: CustomToastParams) => {
  return toast(title || 'Failed', {
    description,
    duration,
    style: {
      background: 'tomato',
      border: '2px solid red',
      color: 'white',
      fontSize: '0.9rem',
      fontFamily: 'Ubuntu',
      ...style,
    },
    descriptionClassName: '!text-white',
  })
}

export { successToast, failToast }
