import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~~/types/supabase';
export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const { email } = await readBody(event);
  const { error } = await client.auth.api.sendVerificationEmail(email);

  if (error) {
    throw new Error(error.message );
  }

  return { success: true };
});
