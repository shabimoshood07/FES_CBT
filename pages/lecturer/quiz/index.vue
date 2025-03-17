<template>
  <div>lecturer quiz</div>
</template>
<script setup>
definePageMeta({
  layout: 'lecturer-profile',
});

const user = useSupabaseUser();
console.log('user', user.value);
</script>
