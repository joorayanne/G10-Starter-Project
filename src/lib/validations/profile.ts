import * as yup from 'yup';

export const profileSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  currentPassword: yup.string().when('newPassword', {
    is: (val: string) => val?.length > 0,
    then: yup.string().required('Current password is required when changing password')
  }),
  newPassword: yup.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
});