import { dimensionsImage } from './dimensionsImage';

test('dimensions connues, sans contrainte ni fixe : retourne les dimensions telles quelles', () => {
  const resultat = dimensionsImage({ dimensions: { width: 400, height: 300 } });

  expect(resultat).toEqual({ width: 400, height: 300, maxWidth: undefined, maxHeight: undefined });
});

test('dimensions connues, maxWidthNumber dépassé sans fixedHeight : largeur clampée, hauteur recalculée au ratio', () => {
  const resultat = dimensionsImage({ dimensions: { width: 800, height: 600 }, maxWidthNumber: 400 });

  expect(resultat).toEqual({ width: 400, height: 300, maxWidth: 400, maxHeight: undefined });
});

test('dimensions connues, maxWidthNumber dépassé avec fixedHeight : largeur clampée, hauteur inchangée', () => {
  const resultat = dimensionsImage({
    dimensions: { width: 800, height: 600 },
    maxWidthNumber: 400,
    fixedHeight: 150,
  });

  expect(resultat).toEqual({ width: 400, height: 600, maxWidth: 400, maxHeight: undefined });
});

test('dimensions connues, maxHeightNumber dépassé sans fixedWidth : hauteur clampée, largeur recalculée au ratio', () => {
  const resultat = dimensionsImage({ dimensions: { width: 600, height: 800 }, maxHeightNumber: 400 });

  expect(resultat).toEqual({ width: 300, height: 400, maxWidth: undefined, maxHeight: 400 });
});

test('dimensions connues, maxHeightNumber dépassé avec fixedWidth : hauteur clampée, largeur inchangée', () => {
  const resultat = dimensionsImage({
    dimensions: { width: 600, height: 800 },
    maxHeightNumber: 400,
    fixedWidth: 150,
  });

  expect(resultat).toEqual({ width: 600, height: 400, maxWidth: undefined, maxHeight: 400 });
});

test('dimensions connues, largeur et hauteur dépassées en cascade : les deux sont clampées', () => {
  const resultat = dimensionsImage({
    dimensions: { width: 1000, height: 500 },
    maxWidthNumber: 400,
    maxHeightNumber: 150,
  });

  expect(resultat).toEqual({ width: 300, height: 150, maxWidth: 400, maxHeight: 150 });
});

test('avant chargement, fixedWidth et fixedHeight fournis : retournés tels quels', () => {
  const resultat = dimensionsImage({ dimensions: null, fixedWidth: 200, fixedHeight: 100 });

  expect(resultat).toEqual({ width: 200, height: 100, maxWidth: undefined, maxHeight: undefined });
});

test('avant chargement, fixedWidth seul sans maxHeightNumber : hauteur de repli au ratio par défaut', () => {
  const resultat = dimensionsImage({ dimensions: null, fixedWidth: 200 });

  expect(resultat).toEqual({ width: 200, height: 150, maxWidth: undefined, maxHeight: undefined });
});

test('avant chargement, fixedWidth seul avec maxHeightNumber : hauteur de repli = maxHeightNumber', () => {
  const resultat = dimensionsImage({ dimensions: null, fixedWidth: 200, maxHeightNumber: 90 });

  expect(resultat).toEqual({ width: 200, height: 90, maxWidth: undefined, maxHeight: 90 });
});

test('avant chargement, fixedHeight seul sans maxWidthNumber : largeur de repli au ratio par défaut', () => {
  const resultat = dimensionsImage({ dimensions: null, fixedHeight: 150 });

  expect(resultat).toEqual({ width: 200, height: 150, maxWidth: undefined, maxHeight: undefined });
});

test('avant chargement, fixedHeight seul avec maxWidthNumber : largeur de repli = maxWidthNumber', () => {
  const resultat = dimensionsImage({ dimensions: null, fixedHeight: 150, maxWidthNumber: 80 });

  expect(resultat).toEqual({ width: 80, height: 150, maxWidth: 80, maxHeight: undefined });
});

test('avant chargement, ni fixe ni max : tout est undefined', () => {
  const resultat = dimensionsImage({ dimensions: null });

  expect(resultat).toEqual({ width: undefined, height: undefined, maxWidth: undefined, maxHeight: undefined });
});

test('avant chargement, maxWidthNumber seul : largeur et hauteur de repli au ratio par défaut', () => {
  const resultat = dimensionsImage({ dimensions: null, maxWidthNumber: 120 });

  expect(resultat).toEqual({ width: 120, height: 90, maxWidth: 120, maxHeight: undefined });
});

test('avant chargement, maxHeightNumber seul sans maxWidthNumber : largeur undefined, hauteur = maxHeightNumber', () => {
  const resultat = dimensionsImage({ dimensions: null, maxHeightNumber: 70 });

  expect(resultat).toEqual({ width: undefined, height: 70, maxWidth: undefined, maxHeight: 70 });
});
