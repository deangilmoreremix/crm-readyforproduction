import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const r = (p: string) => resolve(fileURLToPath(new URL('.', import.meta.url)), p);

export default defineConfig({
  // Use the client app as the single application root
  root: 'client',
  plugins: [
    react(),
    nodePolyfills({
  protocolImports: true
    })
  ],
  resolve: {
    alias: {
  '@': r('client/src'),
      events: 'events',
      util: 'util'
    }
  },
  optimizeDeps: {
    include: ['events', 'util']
  },
  build: {
    // Emit production build to repo root "dist" for deploy scripts compatibility
    outDir: '../dist',
    emptyOutDir: true
  }
});