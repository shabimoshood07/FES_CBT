<template>
  <div
    class="flex justify-center items-center flex-col gap-5 bg-Primary_Variation w-fit mx-auto rounded-lg p-4"
  >
    <i class="pi pi-check-circle text-Success text-4xl" />
    <div class="space-y-5">
      <h1 class="text-center text-2xl md:text-4xl font-semibold">
        Login Successful
      </h1>
      <p class="text-center text-base md:text-2xl font-medium animate-pulse">
        Redirecting ...
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Database } from '~/types/supabase';
definePageMeta({
  layout: 'auth',
});

//Supabse client
const supabase = useSupabaseClient<Database>();

//Toast
const toast = useToast();

//Router
const router = useRouter();
onMounted(async () => {
  //Supabse user
  const user = useSupabaseUser();
  // redirect is no user
  if (!user.value) router.replace('/');

  //update lecturer verification status
  const { error } = await supabase
    .from('lecturer')
    .update({ verified: true })
    .eq('email', user.value!.email!);
  if (error) {
    return toast.add({
      severity: 'error',
      summary: 'Eror',
      detail: error.message,
      life: 3000,
    });
  }
  //navigate to lecturer profile
  router.replace('/lecturer/profile');
});
</script>
