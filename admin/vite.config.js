import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Omogućava eksterni pristup
    strictPort: true, // Osigurava da se koristi samo navedeni port
    allowedHosts: ['admin.srv758372.hstgr.cloud'] // Dodaj svoj domen ovde
  }
})
