import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main:    './index.html',
        sentinel:'./sentinelhaven.html',
      },
      output: {
        manualChunks: { vendor: ['react','react-dom'] },
      },
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
  define: { __APP_VERSION__: JSON.stringify('2.0.0') },
});
