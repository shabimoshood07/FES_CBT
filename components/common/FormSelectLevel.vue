<template>
    <div class="flex flex-col gap-2">
      <label
        :for="props.name"
        class="form-label"
      >
        Select level
      </label>
      <!-- filter -->
      <Select
        v-model="value"
        :options="levels"
        option-label="label"
        option-value="value"
        placeholder="Select a level"
        class="w-full"
        :class="{
          'p-invalid': errorMessage,
        }"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex items-center text-secondary"
          >
            <div>
              {{
                levels.find((level) => level.value === slotProps.value).label
              }}
            </div>
          </div>
  
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
  
        <template #option="slotProps">
          <div class="flex items-center">
            <div>
              {{ slotProps.option.label }}
            </div>
          </div>
        </template>
      </Select>
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
  import { levels } from '~/utils/departments';
  const props = defineProps({
    name: {
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
  