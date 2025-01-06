import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'https://677bd9b020824100c07b0032.mockapi.io/api',  // تحقق من عنوان الـ API الصحيح
    }
  }
})

