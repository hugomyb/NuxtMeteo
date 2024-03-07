// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  runtimeConfig: {
    public: {
      openWeatherMapApiKey: 'a2c52cf480fbf1ef631de4a501b5c5bf'
    }
  }
})
