<template>
  <main class="md:min-h-screen flex">
    <LecturerProfileSidebar />
    <div class="flex-1 relative overflow-hidden">
      <LecturerTopNav />
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import LecturerProfileSidebar from '~/components/navigation/LecturerProfileSidebar.vue';
import LecturerTopNav from '~/components/navigation/LecturerTopNav.vue';
</script>
