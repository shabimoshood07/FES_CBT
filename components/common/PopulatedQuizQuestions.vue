<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <Button
    v-if="populatedQuestions.length > 0"
    label="Upload"
    icon="pi pi-cloud-upload"
    :loading="isLoading"
    class="text-lg"
    @click="handleUpload"
  />
  <section class="grid xl:grid-cols-2 gap-4">
    <div
      v-for="question in populatedQuestions"
      :key="question.id"
    >
      <MultichoicePopulatedQuestion
        v-if="question.question_type === 'multi_choice'"
        :question="question"
        @delete="handleShowDeleteDialog"
        @edit="handleEdit"
      />
      <TrueFalsePopulatedQuestion
        v-if="question.question_type === 'true_false'"
        :question="question"
        @delete="handleShowDeleteDialog"
        @edit="handleEdit"
      />
    </div>

    <!-- Delete Modal -->
    <Dialog
      v-model:visible="deleteModalVisible"
      modal
      header="Delete Question"
      class="w-11/12 max-w-2xl"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Are you sure you want to delete this question</span
      >
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          @click="deleteModalVisible = false"
        />
        <Button
          type="button"
          label="Delete"
          severity="danger"
          @click="handleDelete"
        />
      </div>
    </Dialog>

    <!-- Edit Modal -->
    <Dialog
      v-model:visible="editModalVisible"
      modal
      header="Edit Question"
      class="w-11/12 max-w-4xl"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Edit Question</span
      >
      <form
        class="flex flex-col gap-4"
        @submit.prevent="onSubmit"
      >
        <FormTextareaInput
          name="question"
          label="Question"
          rows="5"
        />

        <div class="flex flex-col gap-4">
          <div
            v-for="(field, idx) in fields"
            :key="field.key"
            class="flex items-start gap-2"
          >
            <div class="flex items-center">
              <RadioButton
                v-model="answer"
                :input-id="`${selectedQuestion?.id}-${field.value.value}-edit`"
                name="answer"
                :value="
                  selectedQuestion?.question_type === 'multi_choice'
                    ? field.value.label
                    : field.value.value
                "
                class="hidden"
              />
              <label
                :for="`${selectedQuestion?.id}-${field.value.value}-edit`"
                class="qstn-label"
                :class="{
                  'qstn-label-text-selected cursor-pointer': isOptionSelected(field.value),
                  'qstn-label-text cursor-pointer': !isOptionSelected(field.value),
                }"
                >{{ field.value.label }}</label
              >
            </div>
            <FormTextareaInput
              v-if="selectedQuestion?.question_type === 'multi_choice'"
              :name="`answers[${idx}].value`"
              class="flex-1"
              rows="2"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="handleCancelEdit"
          />
          <Button
            type="submit"
            label="Update"
          />
        </div>
      </form>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import type { PopulatedQuestionType } from '~/types/index';
import MultichoicePopulatedQuestion from './MultichoicePopulatedQuestion.vue';
import TrueFalsePopulatedQuestion from './TrueFalsePopulatedQuestion.vue';
import { useQuizUploadStore } from '~/store/quiz-upload';
import FormTextareaInput from './FormTextareaInput.vue';
import { useForm, useFieldArray } from 'vee-validate';
import { EditQuestionInSchema } from '~/schemas/schemas';
import { uploadQuestion } from '~/supabase-queries/lecturer';

// Emit
const emit = defineEmits(['removeFile']);

onBeforeUnmount(() => {
  populatedQuestions.value = [];
  selectedQuestion.value = null;
});

//Toast
const toast = useToast();
// Refs
const deleteModalVisible = ref(false);
const editModalVisible = ref(false);
const isLoading = ref(false);
//Route
const route = useRoute();
const quiz_id = route.params.id;

// Store
const quizStore = useQuizUploadStore();
const { selectedQuestion, populatedQuestions, selectedQuestionToDelete } =
  storeToRefs(quizStore);
const { handleUpdate, handleDelete: deleteQuestion } = quizStore;

// Form
const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: EditQuestionInSchema,
  initialValues: {
    question: '',
    answer: '',
    answers: [] as { label: string; value: string | boolean }[],
  },
});

// Use the form's values for the radio button
const answer = computed({
  get: () => values.answer,
  set: (value) => setFieldValue('answer', value),
});

// Update the watch to set initial values and answers
watch(
  () => selectedQuestion.value,
  () => {
    if (!selectedQuestion.value) return;

    setFieldValue('question', selectedQuestion.value.question);
    setFieldValue('answer', selectedQuestion.value.answer);
    setFieldValue(
      'answers',
      selectedQuestion.value.question_type === 'multi_choice'
        ? [
            { value: String(selectedQuestion.value.A), label: 'A' },
            { value: String(selectedQuestion.value.B), label: 'B' },
            { value: String(selectedQuestion.value.C), label: 'C' },
            { value: String(selectedQuestion.value.D), label: 'D' },
          ]
        : [
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ]
    );
  }
);
const { fields } = useFieldArray<{ label: string; value: string | boolean }>(
  'answers'
);

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  if (!selectedQuestion.value?.id) return;

  const baseData = {
    id: selectedQuestion.value.id,
    question: values.question,
    question_type: selectedQuestion.value.question_type,
    answer: values.answer,
  } as const;

  const updatedData =
    selectedQuestion.value.question_type === 'multi_choice'
      ? {
          ...baseData,
          ...Object.fromEntries(
            ['A', 'B', 'C', 'D'].map((label) => [
              label,
              values.answers.find((val) => val.label === label)!.value,
            ])
          ),
        }
      : baseData;
  handleUpdate(updatedData as PopulatedQuestionType);
  selectedQuestion.value = null;
  editModalVisible.value = false;
});

// Delete
const handleShowDeleteDialog = (question_id: string | number) => {
  deleteModalVisible.value = true;
  selectedQuestionToDelete.value = question_id;
};
const handleDelete = () => {
  deleteQuestion(selectedQuestionToDelete.value!);
  selectedQuestionToDelete.value = null;
  deleteModalVisible.value = false;
};

// EDIT
const handleEdit = (question: PopulatedQuestionType) => {
  selectedQuestion.value = question;
  editModalVisible.value = true;
};
const handleCancelEdit = () => {
  selectedQuestion.value = null;
  editModalVisible.value = false;
};

const isOptionSelected = (option: {
  label: string;
  value: string | boolean;
}) => {
  if (!selectedQuestion.value) return false;

  return selectedQuestion.value.question_type === 'multi_choice'
    ? answer.value === option.label
    : answer.value === option.value;
};

// Upload questions
const handleUpload = async () => {
  try {
    isLoading.value = true;
    const data = populatedQuestions.value.map((qst) => {
      const { id, ...rest } = qst;
      return { ...rest, quiz: Number(quiz_id) };
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = await uploadQuestion(data);
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
    populatedQuestions.value = [];
    emit('removeFile');
    await useGetQuestions(Number(quiz_id)).execute();
  } catch (error) {
    console.log('Error [update question]', error);
    return toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
