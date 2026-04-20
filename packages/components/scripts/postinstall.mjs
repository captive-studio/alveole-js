import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const projectRoot = process.env.INIT_CWD ? resolve(process.env.INIT_CWD) : null;

if (projectRoot == null || projectRoot === packageRoot) {
  process.exit(0);
}

const files = [
  ['dist/pdfjs/pdf.min.mjs', 'public/pdf.min.mjs'],
  ['dist/pdfjs/pdf.worker.min.mjs', 'public/pdf.worker.min.mjs'],
];

for (const [source, target] of files) {
  const absoluteSource = resolve(packageRoot, source);
  if (!existsSync(absoluteSource)) {
    continue;
  }

  const absoluteTarget = resolve(projectRoot, target);
  mkdirSync(dirname(absoluteTarget), { recursive: true });
  copyFileSync(absoluteSource, absoluteTarget);
  console.log(`synced ${target}`);
}
