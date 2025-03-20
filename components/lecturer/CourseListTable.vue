<template>
  <section class="space-y-10">
    <h1 class="text-base md:text-2xl text-secondary">Course List</h1>
    <div>
      <div class="card">
        <DataTable
          v-model:filters="filters"
          table-style="min-width: 50rem"
          size="large"
          :value="courses"
          striped-rows
          paginator
          removable-sort
          :loading="status === 'pending'"
          :rows="5"
          :rows-per-page-options="[5, 10, 20, 50]"
          filter-display="menu"
          :global-filter-fields="['date', 'status', 'title']"
          state-storage="session"
          state-key="dt-state-course-list-table"
          class=""
        >
          <template #empty> No course found. </template>
          <template #loading> Loading courses. Please wait. </template>
          <template #header>
            <div class="flex justify-between">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                />
              </IconField>
            </div>
          </template>
          <Column header="Course code">
            <template #body="slotProps">
              {{ slotProps.data.course_code }}
            </template>
          </Column>
          <Column
            field="course_title"
            header="Course title"
          />

          <Column>
            <template #header>
              <div class="text-center font-semibold w-full">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex gap-2 justify-center items-center">
                <Button as-child>
                  <NuxtLink :href="'/lecturer/course/' + slotProps.data.id">
                    <i class="pi pi-external-link" />
                  </NuxtLink>
                </Button>
                <Button
                  icon="pi pi-trash "
                  class="bg-transparent p-0 text-Error border-transparent h-fit w-fit hover:!bg-transparent hover:!border-transparent hover:text-Error"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script setup>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const filters = ref();
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  };
};

initFilters();

// const user = useSupabaseUser();
const { courses, status } = useGetCourses();
console.log('courses', courses.value);
</script>
