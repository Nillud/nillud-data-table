import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

// Например, компилируем SCSS в CSS
const inputPath = path.resolve(__dirname, 'styles', 'index.scss');
const outputPath = path.resolve(__dirname, 'dist', 'styles.css');

execAsync(`sass ${inputPath}:${outputPath}`)
  .then(() => console.log('✔️  SCSS compiled to dist/styles.css'))
  .catch(err => console.error('❌ SCSS compilation error:', err));