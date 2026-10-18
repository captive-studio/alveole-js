import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';

const dist = new URL('./dist/', import.meta.url).pathname;

await build({
  entryPoints: [new URL('./banc.tsx', import.meta.url).pathname],
  bundle: true,
  outfile: `${dist}banc.js`,
  jsx: 'automatic',
  alias: { 'react-native': 'react-native-web' },
  resolveExtensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.mjs', '.js'],
  banner: { js: 'var process = { env: { NODE_ENV: "production", TAMAGUI_TARGET: "web" } };' },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.TAMAGUI_TARGET': '"web"',
    __DEV__: 'false',
  },
  logLevel: 'warning',
});

writeFileSync(
  `${dist}index.html`,
  '<!doctype html><html><head><meta charset="utf-8"></head><body><div id="root"></div><script src="banc.js"></script></body></html>',
);
