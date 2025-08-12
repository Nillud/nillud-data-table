import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'index.ts'
  ],
  dts: true,
  sourcemap: false,
  clean: true,
  format: ['esm'],
  external: [
    'react',
    'react-dom'
  ],
  minify: false,
  target: 'es2018',
  tsconfig: './tsconfig.json'
});
