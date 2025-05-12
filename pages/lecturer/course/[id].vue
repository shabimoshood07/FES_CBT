<template>
  <div class="m-h-screen">
    <PageLoader v-if="status === 'pending'" />

    <!-- Course Info -->
    <div>
      <div>
        <section class="mb-8 space-y-10">
          <BackBtn />
          <div
            v-if="course"
            class="flex justify-between items-center mb-4"
          >
            <h1 class="text-2xl font-semibold text-[#520000]">
              Course Information
            </h1>
            <DeleteConfirmDialog
              accept-label="Delete"
              reject-label="Cancel"
              button-label="Delete course"
              header="Delete course"
              message="Are you sure you want to delete this course?"
              :on-confirm="() => deleteCourse(Number(course!.id))"
              @confirm-success="handleDeleteSuccess"
            />
          </div>
        </section>

        <div
          v-if="course"
          class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 class="text-3xl font-bold text-[#520000] mb-4">
            {{ course.course_title }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <i class="pi pi-book text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Course code</p>
                  <p class="font-semibold">
                    {{ course.course_code }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <i class="pi pi-user text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Level</p>
                  <p class="font-semibold">{{ course.level }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <i class="pi pi-tags text-2xl text-secondary" />
                <div class="space-y-2">
                  <p class="text-sm text-Dark_Text">Programs</p>
                  <div class="flex gap-2 flex-wrap">
                    <Badge
                      v-for="program in course.programs"
                      :key="program"
                      class="font-semibold bg-Primary_Variation text-secondary"
                      :value="
                        programs.find((prog) => prog.value === program)?.name
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CreateCourseModal
            :course-code="course.course_code"
            :course-title="course.course_title"
            is-edit
            :level="course.level"
            :programs="course.programs"
          />
        </div>
        <!-- Course Not Found -->
        <ContentNotFound
          v-if="!course && error"
          error-message="Course not found !!"
        />
      </div>
    </div>

    <!-- Quiz table -->
    <section
      v-if="course"
      class="space-y-10"
    >
      <h1 class="section-heading">Quiz List</h1>
      <div class="card">
        <DataTable
          v-model:filters="filters"
          table-style="min-width: 50rem"
          size="large"
          :value="quizzes"
          striped-rows
          paginator
          removable-sort
          :loading="dataStatus === 'pending'"
          :rows="5"
          :rows-per-page-options="[5, 10, 20, 50]"
          filter-display="menu"
          :global-filter-fields="['date', 'status', 'title']"
          state-storage="session"
          state-key="dt-state-quiz-list-table"
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { format, parse } from 'date-fns';
import BackBtn from '~/components/common/BackBtn.vue';
import ContentNotFound from '~/components/common/ContentNotFound.vue';
import DeleteConfirmDialog from '~/components/common/DeleteConfirmDialog.vue';
import PageLoader from '~/components/common/PageLoader.vue';
import CreateCourseModal from '~/components/modals/CreateCourseModal.vue';
import { deleteCourse } from '~/supabase-queries/lecturer';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
// Page Metadata
definePageMeta({
  layout: 'lecturer-profile',
});

// Route
const route = useRoute();

//Course ID
const course_id = route.params.id;

// Hooks
const { course, status, error } = useGetCourse(Number(course_id));
const { quizzes, status: dataStatus } = useGetCourseQuizzes(Number(course_id));

// Redirect after delete
const handleDeleteSuccess = () => {
  navigateTo('/lecturer/profile');
};

// Table utils
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
</script>
