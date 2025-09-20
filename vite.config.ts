import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ['tests/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'eslint-plugin-required-exports',
      formats: ['cjs'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@typescript-eslint/utils'],
      output: {
        globals: {
          '@typescript-eslint/utils': 'TypeScriptESLintUtils',
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
});