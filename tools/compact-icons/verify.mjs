import { build } from 'esbuild';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

// Comparer les données transmises au moteur d'origine sans lancer React Native.
const react = {
  forwardRef: render => ({ render }),
  createContext: () => ({}),
  createElement: (type, props) => ({ type, props }),
};
// `lab` n'expose pas de composants mais des donnees brutes : ses cles se comparent telles
// quelles, la ou une icone se compare par le rendu qu'elle produit. Renvoie `true` quand la
// cle a bien ete comparee, `false` pour celles qu'on ecarte.
const comparerLaCle = (key, { name, compact, upstream }) => {
  if (name === 'lab') {
    assert.equal(JSON.stringify(compact[key]), JSON.stringify(upstream[key]), key);
    return true;
  }

  if (key === 'Icon' || typeof upstream[key]?.render !== 'function') return false;

  const original = upstream[key].render({}, null);
  const generated = compact[key].render({}, null);
  assert.equal(JSON.stringify(generated.props), JSON.stringify(original.props), key);
  return true;
};

async function load(entry) {
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    external: ['react', 'react-native-svg'],
    write: false,
  });
  const module = { exports: {} };
  runInNewContext(result.outputFiles[0].text, {
    module,
    exports: module.exports,
    require: name => {
      if (name === 'react') return react;
      if (name === 'react-native-svg') return {};
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return module.exports;
}

// Un catalogue compacté est conforme quand il expose exactement les mêmes clés que la
// source et que chacune rend la même chose. Extrait de la boucle qui l'appelle pour que
// la comparaison se lise sans tenir en tête sur quel catalogue on est.
const verifierLeCatalogue = async (name, packageName) => {
  const root = resolve(import.meta.dirname, 'node_modules', packageName);
  const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const upstream = await load(resolve(root, manifest.module));
  const compact = await load(
    resolve(import.meta.dirname, `../../packages/components/src/ui/LucideIcon/vendor/${name}.js`),
  );
  assert.deepEqual(Object.keys(compact).sort(), Object.keys(upstream).sort());
  let compared = 0;
  for (const key of Object.keys(upstream)) if (comparerLaCle(key, { name, compact, upstream })) compared++;
  assert.ok(compared > 100, 'La comparaison doit couvrir tout le catalogue');
  console.log(`${packageName}: ${compared} icônes et alias identiques, exports identiques`);
};

for (const [name, packageName] of [
  ['lucide', 'lucide-react-native'],
  ['lab', '@lucide/lab'],
]) {
  await verifierLeCatalogue(name, packageName);
}
