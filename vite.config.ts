import path from "path"
import tailwindcss from "@tailwindcss/vite"
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
    base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules', 'src/main.tsx'],
    },
  },
})
