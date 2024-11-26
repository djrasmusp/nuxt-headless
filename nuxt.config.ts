// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    WP_USER: process.env.NUXT_WP_USER,
    WP_APP_PASS: process.env.NUXT_WP_APP_PASS,
    HEADLESS: process.env.NUXT_HEADLESS_SECRET,
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      WP_URL: process.env.NUXT_PUBLIC_WORDPRESS_API_URL,
      WP_HOSTNAME: process.env.NUXT_PUBLIC_WORDPRESS_API_HOSTNAME,
      GQL_HOST: process.env.NUXT_PUBLIC_WORDPRESS_API_URL + '/graphql',
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-graphql-client'],
})