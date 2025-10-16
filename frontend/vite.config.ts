import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import { customEnvLoader } from './src/plugins/custom-env-loader'
import path from 'path'

const projectRoot = path.resolve(__dirname, '..')

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    customEnvLoader(path.join(projectRoot, '.env')),
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
          supabase: ['@supabase/supabase-js', '@supabase/ssr'],
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@challengeme/graphql': path.resolve(__dirname, './packages/graphql/client.ts'),
    },
  },
})
