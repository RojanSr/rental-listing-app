import * as yup from 'yup'

export const signUpSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
  contactNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Must be a 10-digit number')
    .required('Contact number is required'),
})
