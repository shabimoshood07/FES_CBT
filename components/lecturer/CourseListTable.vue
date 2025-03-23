<template>
  <section class="space-y-10">
    <h1 class="section-heading">Course List</h1>
    <div>
      <DataTable
        v-model:filters="filters"
        table-style="min-width: 50rem"
        size="large"
        :value="courses"
        striped-rows
        removable-sort
        :loading="status === 'pending'"
        :rows="5"
        :rows-per-page-options="[5, 10, 20, 50]"
        filter-display="menu"
        :global-filter-fields="['date', 'status', 'title']"
        state-storage="session"
        scrollable
        state-key="dt-state-course-list-table"
        class=""
      >
        <!-- paginator -->
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
        >
          <template #body="slotProps">
            <p class="text-wrap">
              {{ slotProps.data.course_title }}
            </p>
          </template></Column
        >
        <Column header="Departments">
          <template #body="slotProps">
            <div class="flex gap-2 flex-wrap">
              <Badge
                v-for="program in slotProps.data.programs"
                :key="program.id"
                :value="programs.find((prog)=>prog.value === program).name"
                class="text-secondary font-semibold "
              />
            </div>
          </template>
        </Column>
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
              
            </div>
          </template>
        </Column>
      </DataTable>
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
const { courses, status } = useGetCourses();

</script>
