<template>
  <div class="flex flex-col gap-2">
    <label
      :for="props.name"
      class="form-label"
    >
      {{ label }}
    </label>
    <InputText
      :id="props.name"
      v-model="value"
      :class="{
        'p-invalid': errorMessage,
      }"
      :placeholder="placeholder"
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
});
const { value, errorMessage } = useField(() => props.name);
</script>
