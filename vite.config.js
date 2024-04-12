import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('src', import.meta.url).pathname,
      '@styles': new URL('src/styles', import.meta.url).pathname,
      // 添加其他样式文件夹的别名
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`, // 入口文件名
        chunkFileNames: `[name].[hash].js`, // 代码分割文件名
        assetFileNames: `[name].[hash].[ext]`, // 静态资源文件名
      },
    },
  },
})
