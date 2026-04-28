import { mkdir, readFile, writeFile } from 'node:fs/promises';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

const outputDir = new URL('../src/generated/', import.meta.url);
const outputFile = new URL('./version.ts', outputDir);

await mkdir(outputDir, { recursive: true });

await writeFile(
  outputFile,
  `export const ALVEOLE_COMPONENTS_VERSION = ${JSON.stringify(packageJson.version)} as const;\n`,
);
