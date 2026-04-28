import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'pinia': fileURLToPath(new URL('./src/lib/pinia-shim/index.js', import.meta.url)),
      'vue-router': fileURLToPath(new URL('./src/lib/vue-router-shim/index.js', import.meta.url))
    },
  },
})
