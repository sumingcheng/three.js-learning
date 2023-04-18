import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    // 设置自动打开浏览器
    open: true
  },
  resolve: {
    alias: {
      // 使用 path.join() 替代 path.resolve()
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve('src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 可以在这里配置 less-loader 的选项
        javascriptEnabled: true,
      },
    }
  }
})
