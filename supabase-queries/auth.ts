import type { Database } from '~/types/supabase';
export const handleLogout = async () => {
  const supabase = useSupabaseClient<Database>();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw { error: true, message: error.message };
    await navigateTo('/');
    return { success: true, message: 'Sign out successful' };
  } catch (error) {
    console.error('Sign out error', error);
  }
};

export const requestVerificationLink = async ({ email }: { email: string }) => {
  const supabase = useSupabaseClient<Database>();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${
        useRuntimeConfig().public.siteUrl
      }/auth/lecturer/confirm`,
      shouldCreateUser: false,
    },
  });
  if (error) {
    return { error: true, message: error.message };
  }
  return { success: true };
};
