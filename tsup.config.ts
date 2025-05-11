import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'index.ts',
    'components/export/ExportExcel.ts',
    'components/export/WordExport.ts'
  ],
  dts: true,
  sourcemap: false,
  clean: true,
  format: ['esm'],
  outExtension({ format }) {
    return {
      js: '.js'
    };
  },
  external: [
    'react',
    'react-dom',
    'docx',
    'exceljs',
    'file-saver'
  ],
  target: 'es2018',
  tsconfig: './tsconfig.json'
});
