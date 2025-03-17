<template>
  <div class="flex flex-col gap-2">
    <label
      :for="props.name"
      class="form-label"
    >
      {{ label }}
    </label>
    <Password
      :id="props.name"
      v-model="value"
      :class="{
        'p-invalid': errorMessage,
      }"
      class="w-full"
      :placeholder="placeholder"
      toggle-mask
      :feedback="feedback"
      :fluid="true"
      :invalid="!!errorMessage"
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
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  feedback: {
    type: Boolean,
    required: true,
  },
});
const { value, errorMessage } = useField(() => props.name);
</script>
