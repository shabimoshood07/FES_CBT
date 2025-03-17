<template>
  <div class="w-full">
    <nav class="flex justify-between items-center bg-primary p-4">
      <div>
        <h1>
          Welcome {{ user.user_metadata.firstName }}
          {{ user.user_metadata.lastName }}
        </h1>
      </div>
      <Button
        icon="pi pi-align-right"
        aria-label="Toggle Sidebar"
        class="md:hidden"
        @click="toggleSidebar"
      />
    </nav>
  </div>
</template>
<script setup>
import { useSidebarStore } from '~/store/navigation';
const user = useSupabaseUser();
const { toggleSidebar } = useSidebarStore();
</script>
