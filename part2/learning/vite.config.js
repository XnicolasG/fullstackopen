import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
    coverage: {
      provider: 'v8', // Activa la cobertura con V8
      reporter: ['text', 'html'], // Define los formatos de reporte
    }

  }
})
