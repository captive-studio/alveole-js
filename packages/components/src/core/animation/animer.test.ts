import { animer } from './animer';

test('produit la prop de transition de Tamagui', () => {
  expect(animer('quicker')).toEqual({ transition: 'quicker' });
});
