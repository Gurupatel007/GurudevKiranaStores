import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr:true,
    host:true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  cacheDir: '.vite'
});