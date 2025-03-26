<template>
  <Card
    class="h-full flex justify-between flex-col"
    :pt="{
      body: {
        class: 'justify-between h-full',
      },
      content:{
        class:'space-y-6'
      }
    }"
  >
    <template #content>
      <p class="m-0">
        {{ question.question }}
      </p>
      <div class="flex flex-col gap-4">
        <div
          v-for="option in options"
          :key="option.label"
          class="flex items-center gap-2"
        >
          <RadioButton
            v-model="answer"
            :input-id="option.label"
            name="dynamic"
            :value="option.label"
            class="hidden"
            disabled
          />
          <label
            :for="option.label"
            class="border text-base uppercase rounded-md py-2 px-4 border-secondary font-semibold text-secondary"
            :class="answer === option.value ? 'bg-green-400' : 'bg-transparent'"
            >{{ option.label }}</label
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
import type { TrueFalseQuestionType } from '~/types';

const emit = defineEmits<{
  delete: [id: string];
  edit: [question: TrueFalseQuestionType];
}>();

const props = defineProps({
  question: {
    type: Object as PropType<TrueFalseQuestionType>,
    required: true,
  },
});

const handleDelete = () => emit('delete', props.question.id);
const handleEdit = () => emit('edit', props.question);

const answer = ref(props.question.answer);
const options = reactive([
  { value: true, label: 'True' },
  { value: false, label: 'False' },
]);
</script>
