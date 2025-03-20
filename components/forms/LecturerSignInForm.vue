<template>
  <!-- Request Verification code -->
  <div
    v-if="isRequestingVerification"
    class="flex justify-center items-center flex-col gap-5 bg-Primary_Variation w-fit mx-auto rounded-lg px-4 py-6"
  >
    <i class="pi pi-check-circle text-Success text-4xl" />
    <div class="space-y-5">
      <h1 class="text-center text-2xl md:text-3xl font-semibold">
        Request verification code
      </h1>
      <Button
        type="button"
        label="Request Code"
        class="w-full"
        :loading="isRequesting"
        @click="handleEmailVerificationLinkRequest"
      />
    </div>
  </div>
  <!-- Form submission successfull -->
  <div
    v-if="isSubmissionSuccessful"
    class="flex justify-center items-center flex-col gap-5 bg-Primary_Variation w-fit mx-auto rounded-lg px-4 py-6"
  >
    <i class="pi pi-check-circle text-Success text-4xl" />
    <div class="space-y-5">
      <h1 class="text-center text-2xl md:text-3xl font-semibold">
        Sign up Successful
      </h1>
      <p class="text-center text-base md:text-xl font-medium">
        Check your email for verification link
      </p>
    </div>
  </div>
  <!-- Sign-in form -->
  <div
    v-if="!isSubmissionSuccessful && !isRequestingVerification"
    class="form-con"
  >
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
import { requestVerificationLink } from '~/supabase-queries/auth';

//Toast
const toast = useToast();

//Supabse client
const supabase = useSupabaseClient();
//Router
const router = useRouter();

//Refs
const isLoading = ref(false);
const isRequestingVerification = ref(false);
const isSubmissionSuccessful = ref(false);
const isRequesting = ref(false);
const email = ref('');

// UseForm
const { handleSubmit } = useForm({
  validationSchema: LecturerSignInSchema,
});

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.message === 'Email not confirmed') {
        email.value = values.email;
        isRequestingVerification.value = true;
      }
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
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
});

const handleEmailVerificationLinkRequest = async () => {
  try {
    isRequesting.value = true;
    const response = await requestVerificationLink({ email: email.value });
    if (response.error) {
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 5000,
      });
    }
    isSubmissionSuccessful.value = true;
    isRequestingVerification.value = false;
  } catch (error) {
    return toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 5000,
    });
  } finally {
    isRequesting.value = false;
  }
};
</script>
