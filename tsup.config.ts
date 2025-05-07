import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],  // Теперь точка входа - index.ts в корне
  dts: true,            // Генерация типов .d.ts
  sourcemap: true,      // Генерация sourcemaps
  clean: true,          // Очистка папки dist перед сборкой
  format: ['esm', 'cjs'], // Форматы выходных файлов
  external: ['react', 'react-dom'],  // Указание внешних зависимостей
  minify: false,        // Отключение минификации
  target: 'es2018',     // Целевая версия ECMAScript
  tsconfig: './tsconfig.json',  // Указание на твой tsconfig
});