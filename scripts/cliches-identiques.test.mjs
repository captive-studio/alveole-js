import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PNG } from 'pngjs';
import { clichesARestaurer, memeImagePourLaCI } from './cliches-identiques.mjs';

/** Un PNG d'une couleur, 2x2 par defaut, encode avec les options donnees. */
const png = (couleur, options = {}, { width = 2, height = 2 } = {}) => {
  const image = new PNG({ width, height });
  for (let i = 0; i < image.data.length; i += 4) image.data.set([...couleur, 255], i);

  return PNG.sync.write(image, options);
};

// Le conteneur reencode parfois un cliche a l'octet pres sans changer un pixel.
test('tient pour identiques deux PNG aux memes pixels encodes differemment', () => {
  const avant = png([10, 20, 30], { deflateLevel: 1 });
  const apres = png([10, 20, 30], { deflateLevel: 9, filterType: 4 });

  assert.notDeepEqual(avant, apres);
  assert.equal(memeImagePourLaCI(avant, apres), true);
});

test('distingue deux PNG dont une couleur change', () => {
  assert.equal(memeImagePourLaCI(png([10, 20, 30]), png([200, 20, 30])), false);
});

// Une page dont la mise en page pivote garde le meme nombre de pixels.
test('distingue deux PNG de meme surface mais de dimensions differentes', () => {
  const couleur = [10, 20, 30];

  assert.equal(
    memeImagePourLaCI(png(couleur, {}, { width: 1, height: 4 }), png(couleur, {}, { width: 4, height: 1 })),
    false,
  );
});

test('retient les seuls cliches modifies que la CI ne distinguerait pas', () => {
  const avant = { 'reencode.png': png([1, 2, 3], { deflateLevel: 1 }), 'change.png': png([1, 2, 3]) };
  const apres = { 'reencode.png': png([1, 2, 3], { deflateLevel: 9 }), 'change.png': png([200, 9, 9]) };

  assert.deepEqual(
    clichesARestaurer(
      ['reencode.png', 'change.png'],
      chemin => avant[chemin],
      chemin => apres[chemin],
    ),
    ['reencode.png'],
  );
});

// Le seuil de `toHaveScreenshot` (0,2) absorbe le flottement d'anticrenelage : la CI ne le
// verrait pas, le diff de la PR ne doit pas le montrer.
test('tient pour identiques deux PNG que la comparaison de la CI ne distinguerait pas', () => {
  assert.equal(memeImagePourLaCI(png([10, 20, 30]), png([10, 20, 31])), true);
});
