import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"

// https://vitejs.dev/config/
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const vitePWA = VitePWA({
  manifest: {
    name: "Bundlet",
    short_name: "Bundlet",
    description: "Bundlet: A ones stop ecommerce platform",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/logo.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      }
    ]
  },
  registerType: 'autoUpdate', // Automatically update the service worker when a new version is detected
  workbox: {
    // Use network-first strategy for all requests
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === 'navigate', // Match navigation requests (HTML pages)
        handler: 'NetworkFirst', // Always try the network first, fall back to cache if offline
        options: {
          cacheName: 'html-cache',
          expiration: {
            maxEntries: 10, // Limit cache size
            maxAgeSeconds: 1 // Expire cache immediately (1 second)
          },
          networkTimeoutSeconds: 5 // Timeout network request after 5 seconds
        }
      },
      {
        urlPattern: /\.(?:js|css|html|png|jpg|jpeg|svg|json)$/, // Match assets like JS, CSS, images, etc.
        handler: 'NetworkFirst', // Always fetch from network first
        options: {
          cacheName: 'assets-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 1 // Expire cache immediately
          }
        }
      }
    ],
    // Disable precaching of assets (optional, if you don’t want any assets cached upfront)
    globPatterns: [], // Prevents precaching of files by default
    cleanupOutdatedCaches: true // Remove old caches on update
  },
  // Optional: Ensure service worker is re-registered on every load
  devOptions: {
    enabled: true // Enable PWA in development mode for testing
  }
})
export default defineConfig({
  plugins: [react(),vitePWA],
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'./src'),
    }
  }
})
