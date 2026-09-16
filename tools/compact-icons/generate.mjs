import { build } from 'esbuild';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inputsHash } from './inputs.mjs';

const destination = resolve(import.meta.dirname, '../../packages/components/src/ui/LucideIcon/vendor');
await mkdir(destination, { recursive: true });
const fingerprint = await inputsHash();

for (const [name, packageName] of [
  ['lucide', 'lucide-react-native'],
  ['lab', '@lucide/lab'],
]) {
  const root = resolve(import.meta.dirname, 'node_modules', packageName);
  const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const result = await build({
    entryPoints: [resolve(root, manifest.module)],
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    external: ['react', 'react-native-svg'],
    write: false,
    minify: true,
    legalComments: 'none',
    banner: {
      js: `// Generated from ${packageName}@${manifest.version}. See ${name}.LICENSE and tools/compact-icons/README.md.\n// Inputs SHA256: ${fingerprint}`,
    },
  });
  await writeFile(resolve(destination, `${name}.js`), result.outputFiles[0].contents);
  await copyFile(resolve(root, manifest.typings), resolve(destination, `${name}.d.ts`));
  await copyFile(resolve(root, 'LICENSE'), resolve(destination, `${name}.LICENSE`));
  console.log(`${packageName}@${manifest.version}: ${result.outputFiles[0].contents.length} bytes of JavaScript`);
}
