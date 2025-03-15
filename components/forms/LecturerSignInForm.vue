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

const { handleSubmit } = useForm({
  validationSchema: LecturerSignInSchema,
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
