import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from './schema'
import type { AuthFormProps, SignUpFormData } from './type'
import { useInitSignUp } from '@/api/services/app/auth/mutations'
import { UserRoundPlusIcon, UserRoundSearchIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type SelectUserTypeCardProps = {
  userType: 'user' | 'admin'
  selectedUserType: 'user' | 'admin'
  setSelectedUserType: React.Dispatch<React.SetStateAction<'user' | 'admin'>>
}

const SelectUserTypeCard = ({
  userType,
  selectedUserType,
  setSelectedUserType,
}: SelectUserTypeCardProps) => {
  return (
    <button
      tabIndex={-1}
      className={cn(
        'w-32 h-32 bg-neutral-100 border-4 border-neutral-300 rounded-3xl flex justify-center relative transition-all duration-300 cursor-pointer',
        { 'border-red-400 bg-red-400/5': selectedUserType === userType },
      )}
      onClick={() =>
        selectedUserType !== userType && setSelectedUserType(userType)
      }
    >
      {userType === 'user' ? (
        <UserRoundSearchIcon
          size={36}
          color={
            selectedUserType === userType ? 'var(--color-theme)' : '#737373'
          }
          style={{
            marginTop: 16,
          }}
        />
      ) : (
        <UserRoundPlusIcon
          size={36}
          color={
            selectedUserType === userType ? 'var(--color-theme)' : '#737373'
          }
          style={{
            marginTop: 16,
          }}
        />
      )}
      <p
        className={cn(
          'absolute bottom-2 text-left text-neutral-500 font-medium text-lg/tight max-w-[8ch] line',
          { 'text-theme': selectedUserType === userType },
        )}
      >
        {userType === 'user' ? 'Find a home' : 'List my property'}
      </p>
    </button>
  )
}

const SignupForm = ({ toggleAuthDialog }: AuthFormProps) => {
  const [selectedUserType, setSelectedUserType] = useState<'user' | 'admin'>(
    'user',
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  })

  const { mutateAsync: initSignUp } = useInitSignUp()

  const onSubmit = async (data: SignUpFormData) => {
    initSignUp({ payload: data, userType: selectedUserType }).then(() =>
      toggleAuthDialog({ authType: 'signup', open: false }),
    )
  }
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex items-center justify-center gap-8">
        <SelectUserTypeCard
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
          userType="user"
        />
        <SelectUserTypeCard
          selectedUserType={selectedUserType}
          setSelectedUserType={setSelectedUserType}
          userType="admin"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            {...register('fullName')}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            {...register('address')}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border border-gray-300 p-2 rounded"
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
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            {...register('contactNumber')}
            className="w-full border border-gray-300 p-2 rounded"
            maxLength={10}
          />
          <p className="text-red-500 text-sm">
            {errors.contactNumber?.message}
          </p>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-theme text-white p-2 rounded-4xl hover:bg-theme/80 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default SignupForm
