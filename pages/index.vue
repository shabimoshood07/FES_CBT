<template>
  <div class="flex flex-col md:flex-row py-10 items-center gap-4">
    <Button as-child>
      <NuxtLink
        href="/auth/lecturer/sign-in"
        class="home-btn"
      >
        Take Quiz
      </NuxtLink>
    </Button>
    <Button as-child>
      <NuxtLink
        href="/auth/lecturer/sign-in"
        class="home-btn"
      >
        Lecturer Login
      </NuxtLink>
    </Button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>
