import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { LoginFormData } from './type'
import { useInitLogin } from '@/api/services/app/auth/mutations'
import { useNavigate } from '@tanstack/react-router'

// Yup schema
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const { mutateAsync: initLogin } = useInitLogin()

  const onSubmit = (data: LoginFormData) => {
    initLogin(data).then(() =>
      // toggleAuthDialog({ authType: 'login', open: false }),
      {
        console.log('running')
        navigate({ to: '/', reloadDocument: true })
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your email"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your password"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full bg-theme text-white p-2 rounded-4xl hover:bg-theme/80 disabled:opacity-50"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm
