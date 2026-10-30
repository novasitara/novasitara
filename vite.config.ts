import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The API (novasitara-api) runs on port 3000. In production Nginx forwards /api and /uploads the same way.
const api = { target: 'http://localhost:3000', changeOrigin: true };

export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': api, '/uploads': api } },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
