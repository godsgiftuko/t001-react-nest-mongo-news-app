import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // server: {
  // proxy: {
  //   '/api': {
  //     target: 'https://t001-news-app.vercel.app',
  //     changeOrigin: true,
  //   },
  // }}
}
);
