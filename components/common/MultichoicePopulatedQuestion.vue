<template>
  <Card
    class="h-full flex justify-between flex-col"
    :pt="{
      body: {
        class: 'justify-between h-full',
      },
      content: {
        class: 'space-y-6',
      },
    }"
  >
    <template #content>
      <p class="qstn-question">
        {{ question.question }}
      </p>
      <div class="flex flex-col gap-5">
        <div
          v-for="option in options"
          :key="option.label"
          class="flex items-center gap-2"
        >
          <RadioButton
            v-model="answer"
            :input-id="question.id + '' + 'display'"
            :name="'answer' + '' + question.id"
            :value="option.label"
            class="hidden"
            disabled
          />
          <label
            :for="question.id + '' + 'display'"
            class="qstn-label"
            :class="
              answer === option.label
                ? 'qstn-label-text-selected'
                : 'qstn-label-text'
            "
            >{{ option.label }}</label
          >
          <label
            :for="question.id + '' + 'display'"
            class="option-label"
            >{{ option.value }}</label
          >
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 mt-1 justify-end">
        <Button
          icon="pi pi-pencil"
          severity="success"
          outlined
          @click="handleEdit"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="handleDelete"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { MultiChoiceQuestionType } from '~/types';

const emit = defineEmits<{
  delete: [id: string | number];
  edit: [question: MultiChoiceQuestionType];
}>();

const props = defineProps({
  question: {
    type: Object as PropType<MultiChoiceQuestionType>,
    required: true,
  },
});

const handleDelete = () => emit('delete', props.question.id);
const handleEdit = () => emit('edit', props.question);

const answer = computed(() => props.question.answer);

const options = computed(() => [
  { value: props.question.A, label: 'A' },
  { value: props.question.B, label: 'B' },
  { value: props.question.C, label: 'C' },
  { value: props.question.D, label: 'D' },
]);
</script>
