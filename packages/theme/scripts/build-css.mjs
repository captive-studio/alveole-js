import { build } from 'esbuild';
import { unlinkSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const tmpFile = join(__dirname, '../.tmp-css-gen.cjs');

await build({
  entryPoints: [join(__dirname, '../src/helpers/injectVariableCSS.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: tmpFile,
  tsconfig: join(__dirname, '../tsconfig.build.json'),
  plugins: [
    {
      // Les .ttf de @expo-google-fonts n'ont pas de loader esbuild et feraient echouer le
      // bundle. Le CSS web ne sert pourtant aucune police locale : generateFontFaceCSS emet
      // un @import Google Fonts. Ces modules peuvent donc etre neutralises.
      name: 'ttf-loader',
      setup(b) {
        b.onLoad({ filter: /\.ttf$/ }, () => ({ contents: 'module.exports = undefined', loader: 'js' }));
      },
    },
    {
      name: 'react-native-mock',
      setup(b) {
        b.onResolve({ filter: /^react-native$/ }, () => ({ path: 'rn', namespace: 'rn-mock' }));
        b.onLoad({ filter: /.*/, namespace: 'rn-mock' }, () => ({
          contents: `module.exports = { Platform: { OS: 'web', select: (obj) => obj.web ?? obj.default } }`,
          loader: 'js',
        }));
      },
    },
  ],
});

const { generateDefaultThemeCSS, generateFontFaceCSS, generateFontSmoothingCSS } = require(tmpFile);

const css = [generateFontFaceCSS(), generateFontSmoothingCSS(), generateDefaultThemeCSS()].join('\n\n');

writeFileSync(join(__dirname, '../dist/default.css'), css);
unlinkSync(tmpFile);
console.log('✓ dist/default.css generated');
