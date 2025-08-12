import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
      polyfills: {
        events: true,
        util: true,
        buffer: true,
        process: true
      }
    })
  ],
  resolve: {
    alias: {
      events: 'events',
      util: 'util'
    }
  },
  optimizeDeps: {
    include: ['events', 'util']
  }
});