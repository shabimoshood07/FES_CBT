<template>
  <div class="w-full min-h-[300px] flex items-center justify-center p-4">
    <div
      class="flex flex-col items-center gap-6 p-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg transform hover:scale-102 transition-all duration-300"
      :class="{ 'animate-bounce-in': show }"
    >
      <div class="relative">
        <i
          class="pi pi-exclamation-circle text-8xl text-red-500/90 animate-pulse"
        />
        <i
          class="pi pi-times-circle absolute -top-2 -right-2 text-2xl text-red-600 animate-ping"
        />
      </div>

      <h2
        class="text-2xl md:text-4xl text-center font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
      >
        {{ errorMessage }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
});

const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(0.89);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
