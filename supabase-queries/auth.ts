export const handleLogout = async () => {
  const supabase = useSupabaseClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw { error: true, message: error.message };
    await navigateTo('/');
    return { success: true, message: 'Sign out successful' };
  } catch (error) {
    console.error('Sign out error', error);
  }
};
