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
  <!-- Sign-up form -->
  <div
    v-else
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
<script setup>
import { useForm } from 'vee-validate';
import FormTextInput from '../common/FormTextInput.vue';
import FormPasswordInput from '../common/FormPasswordInput.vue';
import { LecturerSignUpSchema } from '~/schemas/schemas';
import { useToast } from 'primevue/usetoast';
//Toast
const toast = useToast();

//Supabse client
const supabase = useSupabaseClient();

// Refs
const isSubmissionSuccessful = ref(false);
const isLoading = ref(false);
const { handleSubmit } = useForm({
  validationSchema: LecturerSignUpSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          department: values.department,
          firstName: values.firstName,
          lastName: values.lastName,
          staffId: values.staffId,
        },
        emailRedirectTo: `${
          useRuntimeConfig().public.siteUrl
        }/auth/lecturer/confirm`,
      },
    });
    if (error) {
      return toast.add({
        severity: 'error',
        summary: 'Info',
        detail: error.message,
        life: 3000,
      });
    }
    console.log('data', data);
    isSubmissionSuccessful.value = true;
  } catch (error) {
    console.log('error on signUp', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
