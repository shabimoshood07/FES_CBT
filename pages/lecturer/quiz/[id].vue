<template>
  <div class="m-h-screen space-y-6">
    <!-- Quiz Info -->
    <QuizInfoHeader />
    <!--Quiz question uploader  -->
    <Divider />
    <QuizQuestionUploader v-if="quiz" />
    <Divider />
    <!-- Existing Questions -->
    <ExistingQuestions v-if="quiz" />
  </div>
</template>
<script setup lang="ts">
import ExistingQuestions from '~/components/common/ExistingQuestions.vue';
import QuizQuestionUploader from '~/components/common/QuizQuestionUploader.vue';
import QuizInfoHeader from '~/components/lecturer/QuizInfoHeader.vue';

// Page Metadata
definePageMeta({
  layout: 'lecturer-profile',
});

// Route
const route = useRoute();
// Quiz ID
const quiz_id = route.params.id;

// Hooks
const { quiz } = useGetQuiz(Number(quiz_id));
</script>
