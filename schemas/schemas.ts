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
      department: z.enum(['bqs', 'aid', 'sgi', 'urp'], {
        message: 'Invalid department',
      }),
      confirmPassword: z.string({ required_error: 'Confirm password' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password do not match',
      path: ['confirmPassword'],
    })
);

export const createCourseSchema = z.object({
  course_code: z
    .string({ required_error: 'Course code is required' })
    .min(1, 'Course code is required'),
  course_title: z
    .string({ required_error: 'Course title is required' })
    .min(1, 'Course title is required'),
  level: z.string({ required_error: 'Select level' }).min(1, 'Select level'),
  programs: z
    .array(z.string({ required_error: 'Select at least one program' }))
    .nonempty({ message: 'Select at least one program' })
    .min(1, { message: 'Select at least one program' }),
});
export const createCourseFormSchema = toTypedSchema(createCourseSchema);
export const createQuizSchema = z.object({
  course: z
    .number({ required_error: 'Select a course' })
    .min(1, 'Select a course'),
  number_of_questions: z.number({
    required_error: 'Number of questions is required',
    invalid_type_error: 'Number of questions is required',
  }),
  duration: z.number({
    required_error: 'Duration of quiz in seconds is required',
    invalid_type_error: 'Duration of quiz in seconds is required',
  }),
  date: z
    .date({
      required_error: 'Quiz date is required 1',
      invalid_type_error: 'Quiz date is required',
    }),
    // .transform((val) => val.toISOString()),
  title: z
    .string({ required_error: 'Quiz title is required' })
    .min(1, 'Quiz title is required'),
});
export const createQuizFormSchema = toTypedSchema(createQuizSchema);
