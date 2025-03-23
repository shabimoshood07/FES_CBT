<template>
  <div class="m-h-screen">
    <PageLoader v-if="status === 'pending'" />

    <div class="min-h-screen">
      <div>
        <section class="mb-8 space-y-10">
          <BackBtn />
          <div
            v-if="quiz"
            class="flex justify-between items-center mb-4 flex-wrap gap-6"
          >
            <h1 class="text-2xl font-semibold text-[#520000]">
              Quiz Information
            </h1>
            <DeleteConfirmDialog
              accept-label="Delete"
              reject-label="Cancel"
              header="Delete quiz"
              message="Are you sure you want to delete this quiz?"
              button-label="Delete quiz"
              :on-confirm="() => deleteQuiz(Number(quiz_id))"
              @confirm-success="handleDeleteSuccess"
            />
          </div>
        </section>

        <div
          v-if="quiz"
          class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 class="text-3xl font-bold text-[#520000] mb-4">
            {{ quiz.title }}
          </h2>
          <!-- Quiz Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <i class="pi pi-book text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Course</p>
                  <p class="font-semibold">
                    {{ quiz.course.course_code }} -
                    {{ quiz.course.course_title }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <i class="pi pi-calendar-plus text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Date</p>
                  <p class="font-semibold">
                    {{
                      format(
                        parse(quiz.date, 'yyyy-MM-dd', new Date()),
                        'do MMMM yyyy'
                      )
                    }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <i class="pi pi-user text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Level</p>
                  <p class="font-semibold">{{ quiz.course.level }}</p>
                </div>
              </div>
              <Badge
                :value="quiz.status === 'due' ? 'Due' : 'Upcoming'"
                :severity="quiz.status === 'due' ? 'danger' : 'success'"
                class="min-w-[100px] text-base"
              />
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <i class="pi pi-list text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Number of Questions</p>
                  <p class="font-semibold">
                    {{ quiz.number_of_questions }} questions
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <i class="pi pi-clock text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Duration</p>
                  <p class="font-semibold">{{ formatTime(quiz.duration) }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <i class="pi pi-tags text-2xl text-secondary" />
                <div>
                  <p class="text-sm text-Dark_Text">Programs</p>
                  <div class="flex gap-2 flex-wrap">
                    <Badge
                      v-for="program in quiz.course.programs"
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
          <!-- Create Quiz Modal -->
          <CreateQuizModal
            :number-of-questions="quiz.number_of_questions"
            :course="quiz.course.id"
            :duration="quiz.duration"
            :title="quiz.title"
            :date="new Date(quiz.date)"
            :is-edit="true"
          />
        </div>
      </div>

      <!-- Quiz Not Found -->
      <ContentNotFound
        v-if="!quiz && error"
        error-message="Quiz not found !!"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { format, parse } from 'date-fns';
import BackBtn from '~/components/common/BackBtn.vue';
import ContentNotFound from '~/components/common/ContentNotFound.vue';
import DeleteConfirmDialog from '~/components/common/DeleteConfirmDialog.vue';
import PageLoader from '~/components/common/PageLoader.vue';
import CreateQuizModal from '~/components/modals/CreateQuizModal.vue';
import { deleteQuiz } from '~/supabase-queries/lecturer';

const route = useRoute();
const quiz_id = route.params.id;
definePageMeta({
  layout: 'lecturer-profile',
});

const { quiz, status, error } = useGetQuiz(Number(quiz_id));
const handleDeleteSuccess = () => {
  navigateTo('/lecturer/quiz');
};
</script>
