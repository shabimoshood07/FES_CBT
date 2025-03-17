<template>
  <div
    class="flex justify-center items-center flex-col gap-5 bg-Primary_Variation w-fit mx-auto rounded-lg p-4"
  >
    <i class="pi pi-check-circle text-Success text-4xl" />
    <div class="space-y-5">
      <h1 class="text-center text-2xl md:text-4xl font-semibold">
        Login Successful
      </h1>
      <p class="text-center text-base md:text-2xl font-medium animate-pulse">
        Redirecting ...
      </p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'auth',
});
const router = useRouter();
onMounted(async () => {
  const user = useSupabaseUser();
  console.log('user', user.value);
  if (!user) router.replace('/');
  router.replace('/lecturer/profile');
});
</script>

<!-- <template>
  <div class="confirm-email-page">
    <div class="confirmation-container">
      <div class="icon-container">
        <svg
          v-if="user"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#4CAF50"
          width="64"
          height="64"
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
        <div
          v-else
          class="loading-spinner"
        />
      </div>
      <h2
        v-if="user"
        class="success-text"
      >
        Login Successful!
      </h2>
      <p
        v-if="user"
        class="redirecting-text"
      >
        Redirecting...
      </p>
      <p
        v-else
        class="redirecting-text"
      >
        Verifying...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'auth',
});

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  user.value = await useSupabaseUser().value;
  console.log('user', user.value);

  // if (user.value) {
  //   setTimeout(() => {
  //     router.push('/');
  //   }, 1500); // Redirect after 1.5 seconds
  // }
});

// Removed the watch as onMounted handles the logic better.
</script>

<style scoped>
.confirm-email-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--primary);
}

.confirmation-container {
  text-align: center;
  padding: 40px;
  border-radius: 12px;
  background-color: var(--off-white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-container {
  margin-bottom: 20px;
}

.success-text {
  color: var(--success);
  font-size: 24px;
  margin-bottom: 10px;
}

.redirecting-text {
  color: var(--dark-text);
  font-size: 16px;
}

.loading-spinner {
  border: 4px solid var(--neutral-gray);
  border-top: 4px solid var(--secondary);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> -->
