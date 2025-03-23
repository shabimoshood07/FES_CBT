import type { Database } from '~/types/supabase';
import type { z } from 'zod';
import type { createCourseSchema, createQuizSchema } from '~/schemas/schemas';

export const getLecturerDetails = async ({ user_id }: { user_id: string }) => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = await supabase
    .from('lecturer')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, lecturer: data };
};

export type CreateCourseArgs = z.infer<typeof createCourseSchema>;
export type CreateQuizArgs = z.infer<typeof createQuizSchema>;

/****
 COURSE
 ***/

export const createCourse = async ({
  user_id,
  arg,
}: {
  user_id: string;
  arg: CreateCourseArgs;
}) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase
    .from('course')
    .insert({ ...arg, lecturer: user_id });
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'course created successfully' };
};
export const updateCourse = async ({
  course_id,
  args,
}: {
  course_id: number;
  args: CreateCourseArgs;
}) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase
    .from('course')
    .update({ ...args })
    .eq('id', course_id);
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'course updated successfully' };
};
export const createQuiz = async ({
  user_id,
  arg,
}: {
  user_id: string;
  arg: CreateQuizArgs;
}) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase
    .from('quiz')
    .insert({ ...arg, lecturer: user_id, date: arg.date.toDateString() });
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'quiz created successfully' };
};
export const getCourses = async () => {
  const supabase = useSupabaseClient<Database>();
  const { error, data } = await supabase.from('course').select('*');
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, data };
};
export const deleteCourse = async (course_id: number) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase.from('course').delete().eq('id', course_id);
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'Course deleted successfully' };
};
export const getNumberOfCourses = async () => {
  const supabase = useSupabaseClient<Database>();
  const { count, error } = await supabase
    .from('course')
    .select('id', { count: 'exact' });
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, count };
};
export const getNumberOfQuizzes = async () => {
  const supabase = useSupabaseClient<Database>();
  const { count, error } = await supabase
    .from('quiz')
    .select('id', { count: 'exact' });
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, count };
};
export const getQuizzes = async () => {
  const supabase = useSupabaseClient<Database>();
  const { error, data } = await supabase.from('quiz').select(`*, course(*)`);
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, data };
};
export const getQuiz = async (quiz_id: number) => {
  const supabase = useSupabaseClient<Database>();
  const { error, data } = await supabase
    .from('quiz')
    .select(`*, course(*)`)
    .eq('id', quiz_id)
    .single();
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, data };
};
export const deleteQuiz = async (quiz_id: number) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase.from('quiz').delete().eq('id', quiz_id);
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'Quiz deleted successfully' };
};
export const updateQuiz = async ({
  quiz_id,
  args,
}: {
  quiz_id: number;
  args: CreateQuizArgs;
}) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase
    .from('quiz')
    .update({ ...args, date: args.date.toDateString() })
    .eq('id', quiz_id);
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, message: 'Quiz updated successfully' };
};
export const getCourse = async (course_id: number) => {
  const supabase = useSupabaseClient<Database>();
  const { error, data } = await supabase
    .from('course')
    .select(`*`)
    .eq('id', course_id)
    .single();
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true, data };
};
