/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NotSan-Taschenbuch',
        short_name: 'NotSan',
        description: 'Nachschlagewerk für NotSan-Fertigkeiten im Einsatz',
        theme_color: '#ffffff',
        background_color: '#b10e0e',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192.webp',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.webp',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
