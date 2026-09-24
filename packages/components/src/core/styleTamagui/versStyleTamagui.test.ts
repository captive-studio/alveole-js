import { versStyleTamagui } from './versStyleTamagui';

test('transmet le style tel quel, sans le transformer', () => {
  const survol = { backgroundColor: 'red', cursor: 'pointer' };

  expect(versStyleTamagui(survol)).toBe(survol);
});
