<template>
  <section class="space-y-6">
    <h2 class="section-heading">
      Existing Questions ({{ questions?.length }})
    </h2>
    <!-- Loading -->
    <div
      v-if="status === 'pending' && !questions"
      class="flex justify-center items-center min-h-56"
    >
      <SectionLoader />
    </div>

    <!-- No questions -->
    <div
      v-if="status === 'success' && questions?.length === 0"
      class="flex justify-center items-center min-h-36 text-center"
    >
      <div class="flex flex-col items-center">
        <i
          class="pi pi-cloud-upload mb-4 text-secondary"
          style="font-size: 3rem"
        />
        <p class="text-lg mb-4 text-Dark_Text">
          It looks like you don't have any questions yet.
        </p>
        <p class="text-base mb-4 text-Dark_Text">
          Click "Choose File" to upload your questions.
        </p>
      </div>
    </div>
    <!-- Questions -->
    <div
      v-if="status === 'success' && questions && questions.length > 0"
      class="grid xl:grid-cols-2 gap-4"
    >
      <div
        v-for="{
          question,
          A,
          B,
          C,
          D,
          id,
          answer: chosenAnswer,
          question_type,
        } in questions"
        :key="id"
      >
        <MultichoicePopulatedQuestion
          v-if="question_type === 'multi_choice'"
          :question="{ A: A!, B: B!, C: C!, D: D!, answer:chosenAnswer as any, id,
        question:question, question_type: 'multi_choice', }"
          @delete="handleShowDeleteDialog"
          @edit="handleEdit"
        />
        <TrueFalsePopulatedQuestion
          v-if="question_type === 'true_false'"
          :question="{
            answer: chosenAnswer === 'true' ? true : false,
            id: id,
            question: question,
            question_type: question_type,
          }"
          @delete="handleShowDeleteDialog"
          @edit="handleEdit"
        />
      </div>
    </div>

    <!-- Delete Modal -->
    <Dialog
      v-model:visible="deleteModalVisible"
      modal
      header="Delete Question"
      :closable="false"
      class="w-11/12 max-w-2xl"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Are you sure you want to delete this question</span
      >
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          :disabled="isLoading"
          @click="handleCancelDelete"
        />
        <Button
          type="button"
          label="Delete"
          severity="danger"
          :loading="isLoading"
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
      :closable="false"
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
                :input-id="`${selectedQuestion?.id}-${field.key}-edit`"
                :name="'answer' + field.key"
                :value="
                  selectedQuestion?.question_type === 'multi_choice'
                    ? field.value.label
                    : Boolean(field.value.value)
                "
                class="hidden"
              />
              <label
                :for="`${selectedQuestion?.id}-${field.key}-edit`"
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
            :disabled="isLoading"
            @click="handleCancelEdit"
          />
          <Button
            type="submit"
            label="Update"
            :loading="isLoading"
          />
        </div>
      </form>
    </Dialog>
  </section>
</template>
<script setup lang="ts">
import type { PopulatedQuestionType } from '~/types/index';
import MultichoicePopulatedQuestion from './MultichoicePopulatedQuestion.vue';
import SectionLoader from './SectionLoader.vue';
import TrueFalsePopulatedQuestion from './TrueFalsePopulatedQuestion.vue';
import { useQuizUploadStore } from '~/store/quiz-upload';
import { EditQuestionInSchema } from '~/schemas/schemas';
import FormTextareaInput from './FormTextareaInput.vue';
import { deleteQuestion, updateQuestion } from '~/supabase-queries/lecturer';

// Route
const route = useRoute();

//Toast
const toast = useToast();

// Quiz ID
const quiz_id = route.params.id;

// Store
const quizStore = useQuizUploadStore();
const { selectedQuestion, selectedQuestionToDelete } = storeToRefs(quizStore);

// Hooks
const { questions, status } = useGetQuestions(Number(quiz_id));

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

// Refs
const deleteModalVisible = ref(false);
const editModalVisible = ref(false);
const isLoading = ref(false);

// Delete
const handleShowDeleteDialog = (question_id: string | number) => {
  deleteModalVisible.value = true;
  selectedQuestionToDelete.value = question_id;
};
const handleCancelDelete = () => {
  selectedQuestionToDelete.value = null;
  deleteModalVisible.value = false;
};
const handleDelete = async () => {
  try {
    isLoading.value = true;
    const response = await deleteQuestion(
      Number(selectedQuestionToDelete.value!)
    );
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
    selectedQuestionToDelete.value = null;
    deleteModalVisible.value = false;
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

// EDIT
const handleEdit = (question: PopulatedQuestionType) => {
  selectedQuestion.value = question;
  editModalVisible.value = true;
};

const handleCancelEdit = () => {
  selectedQuestion.value = null;
  editModalVisible.value = false;
};

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  if (!selectedQuestion.value?.id) return;

  const baseData = {
    id: selectedQuestion.value.id,
    question: values.question,
    question_type: selectedQuestion.value.question_type,
    answer: values.answer,
  } as const;

  const formattedData =
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

  try {
    isLoading.value = true;
    const response = await updateQuestion({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      args: formattedData,
      question_id: Number(formattedData.id),
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
    selectedQuestion.value = null;
    editModalVisible.value = false;
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
});

const isOptionSelected = (option: {
  label: string;
  value: string | boolean;
}) => {
  if (!selectedQuestion.value) return false;

  return selectedQuestion.value.question_type === 'multi_choice'
    ? answer.value === option.label
    : answer.value === option.value;
};
</script>
