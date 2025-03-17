export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarVisible = ref(false);
  const toggleSidebar = () =>
    (isSidebarVisible.value = !isSidebarVisible.value);
  const showSidebar = () => (isSidebarVisible.value = true);
  const hideSidebar = () => (isSidebarVisible.value = false);
  return { isSidebarVisible, toggleSidebar, showSidebar, hideSidebar };
});
