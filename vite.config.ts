import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
