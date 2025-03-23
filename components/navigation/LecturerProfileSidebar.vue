<template>
  <div
    class="fixed top-0 w-screen h-screen md:sticky z-30 md:w-[250px] md:left-0 bg-secondary flex flex-col justify-between transition-all duration-500 shrink-0"
    :class="[
      { '-left-full': !isSidebarVisible },
      { 'left-0': isSidebarVisible },
    ]"
  >
    <Button
      icon="pi pi-times"
      aria-label="Toggle Sidebar"
      class="ml-auto mt-2 mr-2 md:hidden"
      @click="toggleSidebar"
    />
    <nav class="px-2 pt-10 flex-1">
      <ul class="flex flex-col gap-4">
        <li
          v-for="link in lecturerNavigationLinks"
          :key="link.id"
        >
          <nuxt-link
            :to="link.href"
            class="w-full p-2 capitalize text-base tracking-wide font-semibold rounded-md text-primary hover:bg-primary hover:text-secondary transition-all duration-500 flex gap-2"
          >
            <i
              :class="link.icon"
              class="text-lg"
            />
            <span>
              {{ link.lable }}
            </span>
          </nuxt-link>
        </li>
      </ul>
      <Divider />
    </nav>
    <Button
      label="Logout"
      class="bg-Error border-transparent text-Light_Text rounded-none hover:border-transparent hover:!bg-Error hover:!outline-0 hover:border-none border-none !outline-none"
      icon="pi pi-sign-out"
      aria-label="Logout"
      @click="handleLogout"
    />
  </div>
</template>

<script setup>
import { useSidebarStore } from '~/store/navigation';
import { handleLogout } from '~/supabase-queries/auth';

const { toggleSidebar } = useSidebarStore();
const route = useRoute();
console.log("route", route.fullPath);
console.log("route.", route.matched);
console.log("route.", route.path);

const { isSidebarVisible } = storeToRefs(useSidebarStore());
</script>
