<template>
  <Button
    label="Back"
    icon="pi pi-arrow-left"
    icon-class="text-sm"
    class="text-sm"
    @click="router.back()"
  />
</template>
<script setup>
const router = useRouter();
</script>
