<template>
  <div class="">
    <Button
      :label="isEdit ? 'Edit Quiz Info' : 'Create Quiz'"
      class="capitalize"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      :header="isEdit ? 'Edit Quiz' : 'Create Quiz'"
      class="w-11/12 mx-auto md:max-w-2xl"
      :closable="false"
    >
      <span
        v-if="!isEdit"
        class="text-surface-500 dark:text-surface-400 block mb-8"
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
        <FormDatePicker
          name="date"
          label="Quiz date"
          date-format="dd/mm/yy"
        />
        <FormNumberInput
          name="number_of_questions"
          label="Number of questions"
        />
        <FormNumberInput
          name="duration"
          label="Quiz duration (seconds)"
        />
        <FormSelectCourse name="course" />
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
            :label="isEdit ? 'Update' : 'Submit'"
            :loading="isLoading"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import { createQuizFormSchema } from '~/schemas/schemas';
import FormTextInput from '~/components/common/FormTextInput.vue';
import {
  createQuiz,
  updateQuiz,
  type CreateQuizArgs,
} from '~/supabase-queries/lecturer';
import FormSelectCourse from '../common/FormSelectCourse.vue';
import FormDatePicker from '../common/FormDatePicker.vue';
import FormNumberInput from '../common/FormNumberInput.vue';

//Props
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Number,
    default: null,
  },
  numberOfQuestions: {
    type: Number,
    default: null,
  },
  duration: {
    type: Number,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
});

//Toast
const toast = useToast();

//supabse user
const user = useSupabaseUser();

// Ref
const visible = ref(false);
const isLoading = ref(false);
const route = useRoute();
const quiz_id = route.params.id;

// UseForm
const { handleSubmit, resetForm } = useForm({
  validationSchema: createQuizFormSchema,
});

// Watch the 'visible' property to reset form values when the modal is opened
watch(visible, (newVal) => {
  if (newVal && props.isEdit) {
    resetForm({
      values: {
        course: Number(props.course),
        number_of_questions: Number(props.numberOfQuestions),
        date: props.date ?? undefined,
        duration: Number(props.duration),
        title: String(props.title),
      },
    });
  }
});

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  if (props.isEdit) {
    await handleUpdate(values);
  } else {
    await handleCreate(values);
  }
});

const handleCreate = async (values: CreateQuizArgs) => {
  try {
    isLoading.value = true;

    const { error, message } = await createQuiz({
      arg: { ...values },
      user_id: user.value!.id,
    });

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 5000,
      });
      return;
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 5000,
    });

    resetForm();
    visible.value = false;

    await Promise.all([useGetQuizCount().execute(), useGetQuizzes().execute()]);
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error instanceof Error ? error.message : String(error),
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};
const handleUpdate = async (values: CreateQuizArgs) => {
  try {
    isLoading.value = true;

    const { error, message } = await updateQuiz({
      args: { ...values },
      quiz_id: Number(quiz_id),
    });

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 5000,
      });
      return;
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 5000,
    });

    resetForm();
    visible.value = false;

    await useGetQuiz(Number(quiz_id)).execute();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error instanceof Error ? error.message : String(error),
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
