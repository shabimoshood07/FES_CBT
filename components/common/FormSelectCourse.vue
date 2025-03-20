<template>
  <div class="flex flex-col gap-2">
    <label
      :for="props.name"
      class="form-label"
    >
      Select course
    </label>
    <Select
      v-model="value"
      :options="courses"
      filter
      option-label="course_code"
      option-value="id"
      placeholder="Select course"
      class="w-full"
      :class="{
        'p-invalid': errorMessage,
      }"
    >
      <template #value="slotProps">
        <div v-if="!slotProps.value">
          <Button
            v-if="status === 'pending' || error"
            icon="pi pi-refresh"
            :loading="status === 'pending'"
            class="p-0 bg-transparent text-secondary"
            icon-class="text-sm"
            @click="refresh"
          />
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </div>

        <div
          v-if="slotProps.value"
          class="flex items-center text-secondary"
        >
          <div>
            {{
              courses.find((course) => course.id === slotProps.value)
                .course_code
            }}
            ({{
              courses.find((course) => course.id === slotProps.value)
                .course_title
            }})
          </div>
        </div>
      </template>

      <template #option="slotProps">
        <div class="flex items-center">
          <div>
            {{ slotProps.option.course_code }}
            ({{ slotProps.option.course_title }})
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
const { courses, refresh, error, execute, status } = useGetCourses();
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

onMounted(() => {
  execute();
});
</script>
