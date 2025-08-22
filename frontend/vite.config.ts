import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          supabase: ['@supabase/supabase-js', '@supabase/auth-helpers-react'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})
