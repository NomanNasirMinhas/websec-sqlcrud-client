import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server:{
    port:8001,
    strictPort:true,
    },
    preview:{
    port:8002,
    strictPort:false,
    }
})
