<template>
  <div class="">
    <Button
      label="Create Quiz"
      class="capitalize"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Create quiz"
      class="w-11/12 mx-auto md:max-w-2xl"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Create a quiz</span
      >
      <form
        class="flex flex-col gap-5"
        @submit.prevent="onSubmit"
      >
        <FormTextInput
          name="title"
          label="Quiz title"
        />
        <CommonFormDatePicker
          name="date"
          label="Quiz date"
          date-format="dd/mm/yy"
        />
        <CommonFormNumberInput
          name="number_of_questions"
          label="Number of questions"
        />
        <CommonFormNumberInput
          name="duration"
          label="Quiz duration (seconds)"
        />
        <CommonFormSelectCourse name="course" />
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
import { createQuizFormSchema } from '~/schemas/schemas';
import FormTextInput from '~/components/common/FormTextInput.vue';
import { createQuiz } from '~/supabase-queries/lecturer';
//Toast
const toast = useToast();

//supabse user
const user = useSupabaseUser();

// Ref
const visible = ref(false);
const isLoading = ref(false);

// UseForm
const { handleSubmit, resetForm } = useForm({
  validationSchema: createQuizFormSchema,
});

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  console.log('values', values);

  try {
    isLoading.value = true;
    const response = await createQuiz({
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
    await useGetQuizCount().execute();
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
