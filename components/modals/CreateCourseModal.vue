<template>
  <div class="">
    <Button
      label="Create course"
      class="capitalize"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Create course"
      class="w-11/12 mx-auto md:max-w-2xl"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Create an assigned course</span
      >
      <form
        class="flex flex-col gap-5"
        @submit.prevent="onSubmit"
      >
        <FormTextInput
          name="course_code"
          label="Course code"
        />
        <FormTextareaInput
          name="course_title"
          label="Course title"
          rows="5"
        />
        <FormSelectMultipleDepartment
          name="programs"
          label="Departments"
        />

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            :disabled="isLoading"
            @click="visible = false"
          />
          <Button
            type="submit"
            label="Submit"
            :loading="isLoading"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { createCourseFormSchema } from '~/schemas/schemas';
import FormTextInput from '~/components/common/FormTextInput.vue';
import FormTextareaInput from '../common/FormTextareaInput.vue';
import FormSelectMultipleDepartment from '../common/FormSelectMultipleDepartment.vue';
import { createCourse } from '~/supabase-queries/lecturer';
//Toast
const toast = useToast();

//supabse user
const user = useSupabaseUser();

// Ref
const visible = ref(false);
const isLoading = ref(false);

// UseForm
const { handleSubmit, resetForm } = useForm({
  validationSchema: createCourseFormSchema,
});

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await createCourse({
      arg: { ...values },
      user_id: user.value!.id,
    });
    if (response.error) {
      return toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 5000,
      });
    }
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: response.message,
      life: 5000,
    });
    resetForm();
    visible.value = false;
    await useGetCourseCount().execute();
  } catch (error) {
    return toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
