<template>
  <div class="flex flex-col gap-2">
    <label
      :for="props.name"
      class="form-label"
    >
      {{ label }}
    </label>
    <MultiSelect
      v-model="value"
      :options="programs"
      display="chip"
      option-value="value"
      option-label="name"
      filter
      placeholder="Select programs"
      :max-selected-labels="3"
      class="w-full"
      :class="{
        'p-invalid': errorMessage,
      }"
    >
      <template #option="slotProps">
        <div class="flex items-center">
          <div>
            {{ slotProps.option.name }}
          </div>
        </div>
      </template>
    </MultiSelect>
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
import { programs } from '~/utils/departments';
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
