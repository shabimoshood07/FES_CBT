<template>
  <div class="form-con">
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
          name="firstName"
          label="First Name"
        />
        <FormTextInput
          name="lastName"
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
          name="staffId"
          label="Staff ID"
          placeholder="aca1111/scs1111"
        />
      </div>
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
      <!-- <div class="card flex flex-col items-center gap-6">
        <FileUpload
          custom-upload
          mode="basic"
          auto
          @select="onFileSelect"
        />
        <img
          v-if="src"
          :src="src"
          alt="Image"
          class="shadow-md rounded-xl w-full sm:w-64"
          style="filter: grayscale(100%)"
        />
      </div> -->

      <Button
        type="submit"
        label="Sign Up"
        class="w-full"
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
// import { ref } from 'vue';

const { handleSubmit } = useForm({
  validationSchema: LecturerSignUpSchema,
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

// const src = ref(null);

// function onFileSelect(event) {
//   const file = event.files[0];
//   const reader = new FileReader();

//   reader.onload = async (e) => {
//     src.value = e.target.result;
//   };

//   reader.readAsDataURL(file);
// }
</script>
