import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const distPdfDir = resolve(root, 'dist/pdfjs');
const distScriptsDir = resolve(root, 'dist/scripts');

const assets = [
  ['../../node_modules/pdfjs-dist/legacy/build/pdf.min.mjs', 'pdf.min.mjs'],
  ['../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs', 'pdf.worker.min.mjs'],
];

mkdirSync(distPdfDir, { recursive: true });
mkdirSync(distScriptsDir, { recursive: true });

for (const [source, filename] of assets) {
  copyFileSync(resolve(root, source), resolve(distPdfDir, filename));
}

const syncScript = `import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '../..');
const files = [
  ['dist/pdfjs/pdf.min.mjs', 'public/pdf.min.mjs'],
  ['dist/pdfjs/pdf.worker.min.mjs', 'public/pdf.worker.min.mjs'],
];

for (const [source, target] of files) {
  const absoluteSource = resolve(packageRoot, source);
  const absoluteTarget = resolve(process.cwd(), target);
  mkdirSync(dirname(absoluteTarget), { recursive: true });
  copyFileSync(absoluteSource, absoluteTarget);
  console.log(\`synced \${target}\`);
}
`;

writeFileSync(resolve(distScriptsDir, 'sync-pdfjs-web-assets.mjs'), syncScript);
