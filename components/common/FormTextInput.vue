<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="props.label"
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
      fluid
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
});
const { value, errorMessage } = useField(() => props.name);
</script>
