import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'./src'),
    }
  }
})
