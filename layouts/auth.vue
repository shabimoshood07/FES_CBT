<template>
  <div
    class="flex flex-col-reverse lg:flex-row lg:items-center h-full justify-end items-start"
  >
    <div
      class="p-2 md:p-4 w-full lg:max-w-4xl lg:ml-auto h-full flex flex-col lg:justify-center gap-8"
    >
      <Button
        v-if="route.path !== '/'"
        v-slot="slotProps"
        as-child
        class="w-fit !sticky top-0"
      >
        <NuxtLink
          to="/"
          :class="slotProps.class"
          class="w-fit"
        >
          <i class="pi pi-arrow-left" />
          Back
        </NuxtLink>
      </Button>
      <h1
        class="text-secondary text-4xl font-bold lg:text-6xl tracking-wider text-balance leading-10 text-center lg:text-left"
      >
        Faculty of Environmental Sciences
      </h1>
      <slot />
    </div>

    <div
      class="relative lg:min-h-screen overflow-hidden bg-[url(~/assets/images/faculty.jpg)] bg-cover lg:bg-center w-full h-40 xl:flex-1"
    >
      <div
        class="absolute top-0 left-0 w-full h-full z-10 bg-black opacity-50"
      />
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
</script>
