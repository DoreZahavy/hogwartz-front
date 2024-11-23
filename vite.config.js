import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../backend/public',
    emptyOutDir: true
  },
  plugins: [
    react(),
    
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Wartz!',
        short_name: 'Wartz!',
        description: 'The great houses competition',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'hogwartz-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'hogwartz-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
          {
            src: 'hogwartz-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'home-475x961.png',
            sizes: '475x961',
            type: 'image/png',
            label: 'Home screen'
          },
          {
            src: 'secure-475x961.png',
            sizes: '475x961',
            type: 'image/png',
            label: 'Security'
          }
        ]
      },
    }),


  ],
})
