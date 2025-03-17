<template>
  <main class="min-h-screen flex">
    <LecturerProfileSidebar />
    <div class="flex-1">
      <LecturerTopNav />
      <slot />
    </div>
  </main>
</template>
<script setup lang="ts">
import LecturerProfileSidebar from '~/components/navigation/LecturerProfileSidebar.vue';
import LecturerTopNav from '~/components/navigation/LecturerTopNav.vue';
</script>
