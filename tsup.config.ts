import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'index.ts',
    'export/export-excel/index.ts',
    'export/export-word/index.ts'
  ],
  dts: true,
  sourcemap: false,
  clean: true,
  format: ['esm'],
  external: [
    'react',
    'react-dom',
    'docx',
    'exceljs',
    'file-saver'
  ],
  minify: false,
  target: 'es2018',
  tsconfig: './tsconfig.json'
});
