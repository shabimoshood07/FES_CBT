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

type CreateCourseArgs = z.infer<typeof createCourseSchema>;
type CreateQuizArgs = z.infer<typeof createQuizSchema>;

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
    .insert({ ...arg, lecturer: user_id });
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
