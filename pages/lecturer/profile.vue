<template>
  <div class="space-y-10">
    <ProfileHeader />
    <Divider class="bg-secondary border-secondary" />
    <div class="flex gap-4">
      <CreateCourseModal />
      <ModalsCreateQuizModal />
    </div>
    <!-- Course list table -->
    <section>
      <CourseListTable />
    </section>
  </div>
</template>
<script setup>
import CourseListTable from '~/components/lecturer/CourseListTable.vue';
import ProfileHeader from '~/components/lecturer/ProfileHeader.vue';
import CreateCourseModal from '~/components/modals/CreateCourseModal.vue';

definePageMeta({
  layout: 'lecturer-profile',
});
</script>
