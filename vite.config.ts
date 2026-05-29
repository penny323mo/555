import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// base 設為相對路徑，讓 GitHub Pages 與 Vercel 都能正常載入資源。
// 若部署到 GitHub Pages 的子路徑（如 /555/），可改成 '/555/'。
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // MapLibre 為已知的大型向量地圖依賴，已獨立成 chunk，提高警告門檻避免雜訊。
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // 將體積較大的依賴拆成獨立 chunk，改善快取與初次載入。
        manualChunks: {
          maplibre: ['maplibre-gl'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
