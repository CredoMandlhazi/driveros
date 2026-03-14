import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- add this

export default defineConfig({
  plugins: [react()],
  base: '/driveros/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <-- this lets @ point to src/
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          leaflet: ['leaflet'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})