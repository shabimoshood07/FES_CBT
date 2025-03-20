// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/supabase',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],
  plugins: ['~/plugins/primevue-toastservice.ts'],
  //PrimeVue
  primevue: {
    options: {
      theme: 'none',
    },
  },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    useSsrCookies: true,
    redirectOptions: {
      login: '/login',
      callback: '/auth/lecturer/confirm',
      include: undefined,
      exclude: ['/', '/auth/lecturer/sign-up', '/auth/lecturer/sign-in'],
      saveRedirectToCookie: false,
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
});
