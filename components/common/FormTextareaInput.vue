<template>
  <div class="flex flex-col gap-2">
    <label
      :for="props.name"
      class="form-label"
      v-if="label"
    >
      {{ label }}
    </label>
    <Textarea
      :id="props.name"
      v-model="value"
      :class="{
        'p-invalid': errorMessage,
      }"
      :placeholder="placeholder"
      style="resize: none"
      :rows="rows"
    />
    <p
      v-if="errorMessage"
      class="text-Error text-sm -mt-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
<script setup>
import { useField } from 'vee-validate';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: String,
    required: true,
  },
});
const { value, errorMessage } = useField(() => props.name);
</script>
