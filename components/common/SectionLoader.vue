<!-- <template>
  <i
    class="pi pi-spin pi-spinner text-secondary"
    style="font-size: 4rem"
  />
</template> -->

<template>
  <div class="loader-container">
    <div class="loader-circle" />
    <div class="loader-circle" />
    <div class="loader-circle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const secondary = computed(() => '#520000');
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.loader-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: v-bind('secondary');
  animation: bounce 1.4s infinite ease-in-out;
}

.loader-circle:nth-child(2) {
  animation-delay: -0.5s;
}

.loader-circle:nth-child(3) {
  animation-delay: -1s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
