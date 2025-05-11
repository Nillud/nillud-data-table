import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  dts: true,
  sourcemap: true,
  clean: true,
  format: ['esm', 'cjs'], // tsup создаст .js и .cjs
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js', // 👈 избавляемся от .mjs
    };
  },
  external: ['react', 'react-dom'],
  target: 'es2018',
  tsconfig: './tsconfig.json',
});