<template>
  <section class="grid xl:grid-cols-2 gap-4">
    <div
      v-for="question in populatedQuestions"
      :key="question.id"
    >
      <MultichoicePopulatedQuestion
        v-if="question.question_type === 'multi_choice'"
        :question="question"
        @delete="handleDelete"
        @edit="handleEdit"
      />
      <TrueFalsePopulatedQuestion
        v-if="question.question_type === 'true_false'"
        :question="question"
        @delete="handleDelete"
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
          @click="deleteModalVisible = false"
        />
      </div>
    </Dialog>

    <!-- Edit Modal -->
    <Dialog
      v-model:visible="editModalVisible"
      modal
      header="Edit Question"
      class="w-11/12 max-w-2xl"
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
          <!-- <div
            v-for="option in options"
            :key="option.label"
            class="flex items-center gap-2"
          >
            <RadioButton
              v-model="answer"
              :input-id="`${selectedQuestion?.id}-${option.label}-edit`"
              name="answer"
              :value="
                selectedQuestion?.question_type === 'multi_choice'
                  ? option.label
                  : option.value
              "
              class="hidden"
            />
            <label
              :for="`${selectedQuestion?.id}-${option.label}-edit`"
              class="border text-base uppercase rounded-md py-1.5 px-3 border-secondary cursor-pointer font-bold text-secondary"
              :class="{
                'bg-green-400': isOptionSelected(option),
                'bg-transparent': !isOptionSelected(option),
              }"
              >{{ option.label }}</label
            >
            <label
              v-if="selectedQuestion?.question_type === 'multi_choice'"
              :for="`${selectedQuestion?.id}-${option.label}-edit`"
              class="cursor-pointer"
              >{{ option.value }}</label
            >
          </div> -->

          <div
            v-for="(field, idx) in fields"
            :key="field.key"
            class="flex items-center gap-2"
          >
            <div>
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
                class="border text-base uppercase rounded-md py-1.5 px-3 border-secondary cursor-pointer font-bold text-secondary"
                :class="{
                  'bg-green-400': isOptionSelected(field.value),
                  'bg-transparent': !isOptionSelected(field.value),
                }"
                >{{ field.value.label }}</label
              >
            </div>
            <FormTextInput
              v-if="selectedQuestion?.question_type === 'multi_choice'"
              :name="`answers[${idx}].value`"
              class="flex-1"
            />
          </div>

          <p>{{ errors.answer }}</p>
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
import type { PropType } from 'vue';
import type { PopulatedQuestionType } from '~/types/index';
import MultichoicePopulatedQuestion from './MultichoicePopulatedQuestion.vue';
import TrueFalsePopulatedQuestion from './TrueFalsePopulatedQuestion.vue';
import { useQuizUploadStore } from '~/store/quiz-upload';
import FormTextareaInput from './FormTextareaInput.vue';
import { useForm, useFieldArray } from 'vee-validate';
import { EditQuestionInSchema } from '~/schemas/schemas';
import FormTextInput from './FormTextInput.vue';

// Props
defineProps({
  populatedQuestions: {
    type: Array as PropType<PopulatedQuestionType[]>,
    required: true,
  },
});

// Refs
const deleteModalVisible = ref(false);
const editModalVisible = ref(false);

// Store
const { selectedQuestion } = storeToRefs(useQuizUploadStore());

// Form
const { handleSubmit, setFieldValue, errors, values } = useForm({
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
            { value: selectedQuestion.value.A, label: 'A' },
            { value: selectedQuestion.value.B, label: 'B' },
            { value: selectedQuestion.value.C, label: 'C' },
            { value: selectedQuestion.value.D, label: 'D' },
          ]
        : [
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ]
    );
  }
);
const { fields } = useFieldArray('answers');

// Handle submit
const onSubmit = handleSubmit(async (values) => {
  console.log({ ...values, id: selectedQuestion.value?.id });
});

const handleDelete = (question_id: string) => {
  console.log(question_id);
  deleteModalVisible.value = true;
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
</script>
