<template>
  <div class="w-full border-b border-secondary sticky top-0">
    <nav class="flex justify-between items-center bg-primary p-4">
      <div>
        <h1
          v-if="lecturerData"
          class="text-2xl font-semibold text-Dark_Text"
        >
          Welcome
          <span class="capitalize text-secondary">
            {{ lecturerData.first_name }} {{ lecturerData.last_name }}</span
          >
        </h1>
        <p v-if="error">Error: {{ error.message }}</p>
      </div>
      <div>
        <Button
          icon="pi pi-align-right"
          aria-label="Toggle Sidebar"
          class="md:hidden"
          @click="toggleSidebar"
        />
        <Button
          v-if="error"
          icon="pi pi-refresh"
          class="p-1"
          aria-label="Refresh Data"
          :loading="status === 'pending'"
          @click="refreshData"
        />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '~/store/navigation';
//supabase user
const user = useSupabaseUser();
//Sidebar store
const { toggleSidebar } = useSidebarStore();

//Hooks
const { error, lecturerData, refresh, status } = useGetLecturerDetails({
  user_id: user.value!.id,
});

// Function to manually refresh data
const refreshData = () => {
  refresh();
};
</script>
