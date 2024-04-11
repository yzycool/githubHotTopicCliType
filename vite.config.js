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
})
