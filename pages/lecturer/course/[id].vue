<template>
  <div class="m-h-screen">
    <PageLoader v-if="status === 'pending'" />

    <div class="min-h-screen">
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
          <!-- <CreateQuizModal
            :number-of-questions="quiz.number_of_questions"
            :course="quiz.course.id"
            :duration="quiz.duration"
            :title="quiz.title"
            :date="new Date(quiz.date)"
            :is-edit="true"
          /> -->
        </div>
        <!-- Course Not Found -->
        <ContentNotFound
          v-if="!course && error"
          error-message="Course not found !!"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BackBtn from '~/components/common/BackBtn.vue';
import ContentNotFound from '~/components/common/ContentNotFound.vue';
import DeleteConfirmDialog from '~/components/common/DeleteConfirmDialog.vue';
import PageLoader from '~/components/common/PageLoader.vue';
import CreateCourseModal from '~/components/modals/CreateCourseModal.vue';

definePageMeta({
  layout: 'lecturer-profile',
});
const route = useRoute();
const course_id = route.params.id;
const { course, status, error } = useGetCourse(Number(course_id));
</script>
