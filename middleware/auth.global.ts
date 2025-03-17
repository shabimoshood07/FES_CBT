const securedPaths = ['/lecturer/profile', '/lecturer/quiz'];
const authPaths = ['/auth/lecturer/sign-in','/auth/lecturer/sign-up']
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  console.log('///////////////////////user/////////////////////', user.value);

  console.log(
    'to//////////////////////////////////////////////////////////////',
    to
  );
  console.log('from/////////////////////////////////', from);

  if (!user.value && securedPaths.some((path) => to.fullPath.includes(path))) {
    return navigateTo('/');
  }
  if (user.value && authPaths.some((path) => to.fullPath.includes(path))) {
    return navigateTo('/lecturer/profile');
  }
});
