<template>
  <div class="flex flex-col md:flex-row py-10 items-center gap-4">
    <Button
      label="Take Quiz"
      class="w-full text-lg"
      @click="navigateToStudentLogin"
    />
    <Button
      label="Lecturer Login"
      class="w-full text-lg"
      @click="navigateToLectureLogin"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
const router = useRouter();

const navigateToLectureLogin = () => {
  router.push('/auth/lecturer/sign-in');
};

const navigateToStudentLogin = () => {
  router.push('/login');
};
</script>
