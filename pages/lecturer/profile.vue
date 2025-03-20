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
      <LecturerCourseListTable />
    </section>
  </div>
</template>
<script setup>
import ProfileHeader from '~/components/lecturer/ProfileHeader.vue';
import CreateCourseModal from '~/components/modals/CreateCourseModal.vue';

definePageMeta({
  layout: 'lecturer-profile',
});
</script>
