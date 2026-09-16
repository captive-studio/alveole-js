import { cpSync, globSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, '..', 'src');
const distDir = join(root, '..', 'dist');

const files = globSync('**/*.css', { cwd: srcDir });

for (const file of files) {
  const dest = join(distDir, file);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(join(srcDir, file), dest);
  console.log(`Copied ${file}`);
}

// Distribution compacte des icônes : runtime, déclarations et licences amont.
cpSync(join(srcDir, 'ui/LucideIcon/vendor'), join(distDir, 'ui/LucideIcon/vendor'), { recursive: true });
