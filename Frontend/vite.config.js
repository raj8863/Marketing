import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // 1. Increase the warning limit slightly (optional, prevents noise)
    chunkSizeWarningLimit: 1000, 
    
    // 2. Configure Rollup to split chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          // If the file is in node_modules (a library)
          if (id.includes('node_modules')) {
            
            // Separate Framer Motion (it is large)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            
            // Separate React Icons
            if (id.includes('react-icons')) {
              return 'react-icons';
            }
            
            // Put everything else (React, DOM, etc.) into a 'vendor' chunk
            return 'vendor';
          }
        },
      }, 
    },   
  },   
})     