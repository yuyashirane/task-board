import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages のサブパス配信のため base を指定。
// 公開URL: https://yuyashirane.github.io/task-board/
export default defineConfig({
  base: '/task-board/',
  plugins: [react()],
})
