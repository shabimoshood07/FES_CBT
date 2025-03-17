<template>
  <div class="form-con">
    <form
      class="flex flex-col gap-5"
      @submit.prevent="onSubmit"
    >
      <div>
        <h2
          class="capitalize text-left text-lg md:text-xl font-semibold text-secondary"
        >
          Lecturer login
        </h2>
      </div>
      <FormTextInput
        name="email"
        label="Email"
        placeholder="Johndoe@uniabuja.edu.ng"
      />
      <FormPasswordInput
        name="password"
        label="Password"
        placeholder="********"
        :feedback="false"
      />
      <Button
        type="submit"
        label="Sign In"
        class="w-full"
        :loading="isLoading"
      />
    </form>
    <p class="text-right pt-10">
      New on the platform?
      <NuxtLink
        href="/auth/lecturer/sign-up"
        class="text-secondary italic hover:underline font-bold underline-offset-2"
        >Sign Up</NuxtLink
      >
    </p>
  </div>
</template>
<script setup>
import { useForm } from 'vee-validate';
import FormTextInput from '../common/FormTextInput.vue';
import FormPasswordInput from '../common/FormPasswordInput.vue';
import { LecturerSignInSchema } from '~/schemas/schemas';
import { useToast } from 'primevue/usetoast';

//Toast
const toast = useToast();

//Supabse client
const supabase = useSupabaseClient();
//Router
const router = useRouter();

//Refs
const isLoading = ref(false);
// UseForm
const { handleSubmit } = useForm({
  validationSchema: LecturerSignInSchema,
});

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  // const { error } = await supabase.auth.signInWithOtp({
  //   email: values.email,
  //   options: {
  //     emailRedirectTo: `${
  //       useRuntimeConfig().public.siteUrl
  //     }/auth/lecturer/confirm`,
  //     shouldCreateUser: false,
  //   },
  // });
  
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 3000,
      });
    }
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful',
      life: 3000,
    });
    router.replace('/lecturer/profile');
  } catch (error) {
    return toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
