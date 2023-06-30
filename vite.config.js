import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    // 设置自动打开浏览器
    open: true,
    // 设置服务启动端口号
    port: 30004,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
