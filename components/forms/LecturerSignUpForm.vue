<template>
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

  <!-- Sign-up form -->
  <div
    v-if="!isSubmissionSuccessful && !isRequestingVerification"
    class="form-con"
  >
    <form
      class="grid gap-5"
      @submit.prevent="onSubmit"
    >
      <div>
        <h2
          class="capitalize text-left text-lg md:text-xl font-semibold text-secondary"
        >
          Lecturer Sign Up
        </h2>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <FormTextInput
          name="first_name"
          label="First Name"
        />
        <FormTextInput
          name="last_name"
          label="Last Name"
        />
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <FormTextInput
          name="email"
          label="School Email"
          placeholder="Johndoe@uniabuja.edu.ng"
        />
        <FormTextInput
          name="staff_id"
          label="Staff ID"
          placeholder="aca1111/scs1111"
        />
      </div>
      <CommonFormSelectDepartment
        name="department"
        label="Department"
      />
      <div class="grid md:grid-cols-2 gap-5">
        <FormPasswordInput
          name="password"
          label="Password"
          placeholder="********"
          :feedback="true"
        />
        <FormPasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="********"
          :feedback="false"
        />
      </div>

      <Button
        type="submit"
        label="Sign Up"
        class="w-full"
        :loading="isLoading"
      />
    </form>
    <p class="text-right pt-10">
      Already have an account?
      <NuxtLink
        href="/auth/lecturer/sign-in"
        class="text-secondary italic hover:underline font-bold underline-offset-2"
        >Sign In</NuxtLink
      >
    </p>
  </div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import FormTextInput from '../common/FormTextInput.vue';
import FormPasswordInput from '../common/FormPasswordInput.vue';
import { LecturerSignUpSchema } from '~/schemas/schemas';
import { useToast } from 'primevue/usetoast';
import type { Database } from '~/types/supabase';
import { requestVerificationLink } from '~/supabase-queries/auth';

//Toast
const toast = useToast();

//Supabse client
const supabase = useSupabaseClient<Database>();

// Refs
const isSubmissionSuccessful = ref(false);
const isRequestingVerification = ref(false);
const isLoading = ref(false);
const isRequesting = ref(false);
const email = ref('');

// Use form
const { handleSubmit } = useForm({
  validationSchema: LecturerSignUpSchema,
});
// Request verification code
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

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    // Check if lecturer exists
    const { data: lecturer, error: lecturerError } = await supabase
      .from('lecturer')
      .select('*')
      .or(`email.eq.${values.email},staff_id.eq.${values.staff_id}`);

    if (lecturerError) {
      return toast.add({
        severity: 'error',
        summary: 'Info',
        detail: lecturerError.message,
        life: 5000,
      });
    }

    if (lecturer.length > 0 && lecturer[0].verified) {
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email or Staff ID already exists, Sign in to continue',
        life: 5000,
      });
    } else if (lecturer.length > 0 && !lecturer[0].verified) {
      email.value = values.email;
      return (isRequestingVerification.value = true);
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${
            useRuntimeConfig().public.siteUrl
          }/auth/lecturer/confirm`,
        },
      }
    );
    if (signUpError) {
      return toast.add({
        severity: 'error',
        summary: 'Info',
        detail: signUpError.message,
        life: 5000,
      });
    }

    const { error: newLecturerError } = await supabase
      .from('lecturer')
      .insert({
        user_id: signUpData!.user!.id,
        email: values.email,
        staff_id: values.staff_id,
        department: values.department,
        first_name: values.first_name,
        last_name: values.last_name,
        verified: false,
      })
      .select('*');

    if (newLecturerError) {
      await supabase.auth.admin.deleteUser(signUpData!.user!.id);
      return toast.add({
        severity: 'error',
        summary: 'Info',
        detail: newLecturerError.message,
        life: 5000,
      });
    }
    return (isSubmissionSuccessful.value = true);
  } catch (error) {
    console.log('error on signUp', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
