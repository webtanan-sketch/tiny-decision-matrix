import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist-module',
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/module/index.ts'),
      formats: ['es'],
      fileName: () => 'tiny-decision-matrix.js',
      cssFileName: 'tiny-decision-matrix',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'lucide-react'],
    },
  },
});
