import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const LecturerSignInSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required'),
  })
);
export const LecturerSignUpSchema = toTypedSchema(
  z
    .object({
      first_name: z
        .string({ required_error: 'First name is required' })
        .min(1, 'First name is required'),
      last_name: z
        .string({ required_error: 'Last name is required' })
        .min(1, 'Last name is required'),
      email: z
        .string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
      staff_id: z
        .string({ required_error: 'Staff ID is required' })
        .min(1, 'Staff ID is required'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
      department: z
        .string({ required_error: 'Department is required' })
        .min(1, 'Department is required'),
      confirmPassword: z.string({ required_error: 'Confirm password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password do not match',
      path: ['confirmPassword'],
    })
);
