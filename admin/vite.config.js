import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
server:{
allowedHosts:[ 'localhost','admin.alatinidza.rs','admin.srv758372.hstgr.cloud']
}
})
