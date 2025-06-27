import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // base: '/dist/',
  base: './',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // hoặc tùy bạn muốn alias đến đâu
    },
  },
})
