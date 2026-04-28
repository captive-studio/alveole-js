import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const files = [
  ['../../node_modules/pdfjs-dist/legacy/build/pdf.min.mjs', 'public/pdf.min.mjs'],
  ['../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs', 'public/pdf.worker.min.mjs'],
];

for (const [source, target] of files) {
  const absoluteSource = resolve(root, source);
  const absoluteTarget = resolve(root, target);
  mkdirSync(dirname(absoluteTarget), { recursive: true });
  copyFileSync(absoluteSource, absoluteTarget);
  console.log(`synced ${target}`);
}
