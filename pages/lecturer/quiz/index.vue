<template>
  <section class="space-y-10">
    <h1 class="text-base md:text-2xl text-secondary">Quiz List</h1>
    <div>
      <div class="card">
        <!-- :total-records="quizzes.length" -->
        <!-- v-if="quizzes.length" -->
        <DataTable
          v-model:filters="filters"
          table-style="min-width: 50rem"
          size="large"
          :value="quizzes"
          striped-rows
          paginator
          removable-sort
          :loading="status === 'pending'"
          :rows="5"
          :rows-per-page-options="[5, 10, 20, 50]"
          filter-display="menu"
          :global-filter-fields="['date', 'status', 'title']"
          state-storage="session"
          state-key="dt-state-quiz-list-table"
          class=""
        >
          <template #empty> No Quiz found. </template>
          <template #loading> Loading quizzes. Please wait. </template>
          <template #header>
            <div class="flex justify-between">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                @click="clearFilter()"
              />
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
          <!-- :loading="loading" -->
          <Column header="Course code">
            <template #body="slotProps">
              {{ slotProps.data.course.course_code }}
            </template>
          </Column>
          <Column
            field="title"
            header="Quiz title"
          />
          <Column
            header="Date"
            sortable
          >
            <template #body="slotProps">
              {{
                format(
                  parse(slotProps.data.date, 'yyyy-MM-dd', new Date()),
                  'do MMMM yyyy'
                )
              }}
            </template>
          </Column>

          <Column header="Duration (seconds)">
            <template #body="slotProps">
              <div class="flex flex-col justify-center">
                <span>
                  {{ slotProps.data.duration.toLocaleString() }}
                </span>
                <span> ( {{ formatTime(slotProps.data.duration) }}) </span>
              </div>
            </template>
          </Column>
          <Column
            field="number_of_questions"
            header="No. of Questions"
            sortable
          />
          <Column
            :filter-menu-style="{ width: '14rem' }"
            header="Status"
            field="status"
          >
            <template #body="slotProps">
              <Badge
                :severity="
                  slotProps.data.status === 'due' ? 'danger' : 'success'
                "
                :value="slotProps.data.status"
                class="min-w-[100px]"
              />
            </template>
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                :options="statuses"
                placeholder="Select One"
                show-clear
              >
                <template #option="slotProps">
                  <Tag
                    :value="slotProps.option"
                    :severity="
                      slotProps.option === 'due' ? 'danger' : 'success'
                    "
                  />
                </template>
              </Select>
            </template>
          </Column>
          <Column>
            <template #header>
              <div class="text-center font-semibold w-full">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex gap-2 justify-center">
                <Button as-child>
                  <NuxtLink :href="'/lecturer/quiz/' + slotProps.data.id">
                    <i class="pi pi-external-link" />
                  </NuxtLink>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script setup>
import { format, parse } from 'date-fns';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
definePageMeta({
  layout: 'lecturer-profile',
});
const statuses = ref(['due', 'upcoming']);
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
const clearFilter = () => {
  initFilters();
};
// const user = useSupabaseUser();
const { quizzes, status } = useGetQuizzes();
console.log('quizzes', quizzes.value);
</script>
