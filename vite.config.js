import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSSR from 'vite-ssr/plugin.js'
import handlebars from 'vite-plugin-handlebars';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: 
  [
    react(),
    viteSSR(),
    handlebars()
  ]
})
/*,
  server: {
    open: '/dist/index.html'
  }*/