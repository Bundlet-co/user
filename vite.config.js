import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"

// https://vitejs.dev/config/
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const vitePWA = VitePWA({
  name: "Bundlet",
  short_name: "Bundlet",
  description: "Bundlet: A ones stop ecommerce platform",
  theme_color: "#ffffff",
  icons: [
    {
      src: "./favicon.ico",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "./favicon.ico",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "./favicon.ico",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/x-icon"
    }
  ]
})
export default defineConfig({
  plugins: [react(),vitePWA],
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'./src'),
    }
  }
})
