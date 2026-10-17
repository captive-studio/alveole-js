import { animer } from './animer';

test('produit la prop d animation de la version de Tamagui courante', () => {
  expect(animer('quicker')).toEqual({ animation: 'quicker' });
});
