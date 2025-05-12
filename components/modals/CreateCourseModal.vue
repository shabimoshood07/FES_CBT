<template>
  <div>
    <Button
      :label="isEdit ? 'Edit Course' : 'Create Course'"
      class="capitalize"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      :header="isEdit ? 'Edit Course' : 'Create Course'"
      class="w-11/12 mx-auto md:max-w-2xl"
    >
      <span
        v-if="!isEdit"
        class="text-surface-500 dark:text-surface-400 block mb-8"
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
        <FormSelectLevel name="level" />
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
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { createCourseFormSchema } from '~/schemas/schemas';
import FormTextInput from '~/components/common/FormTextInput.vue';
import FormTextareaInput from '../common/FormTextareaInput.vue';
import FormSelectMultipleDepartment from '../common/FormSelectMultipleDepartment.vue';
import {
  createCourse,
  updateCourse,
  type CreateCourseArgs,
} from '~/supabase-queries/lecturer';
import FormSelectLevel from '../common/FormSelectLevel.vue';

//Props
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  courseCode: {
    type: String,
    default: null,
  },
  courseTitle: {
    type: String,
    default: null,
  },
  level: {
    type: String,
    default: null,
  },
  programs: {
    type: Array as () => string[],
    default: () => [],
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
const course_id = route.params.id;

// UseForm
const { handleSubmit, resetForm } = useForm({
  validationSchema: createCourseFormSchema,
});

// Watch the 'visible' property to reset form values when the modal is opened
watch(visible, (newVal) => {
  if (newVal && props.isEdit) {
    resetForm({
      values: {
        course_code: String(props.courseCode),
        course_title: String(props.courseTitle),
        level: String(props.level),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        programs: props.programs as string[],
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
const handleCreate = async (values: CreateCourseArgs) => {
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
    await Promise.all([
      useGetCourseCount().execute(),
      useGetCourses().execute(),
    ]);
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
};
const handleUpdate = async (values: CreateCourseArgs) => {
  try {
    isLoading.value = true;
    const response = await updateCourse({
      args: { ...values },
      course_id: Number(course_id),
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
    await useGetCourse(Number(course_id)).execute();
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
};
</script>
