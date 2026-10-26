import { sanitizeCSSKey } from '@alveole/theme';

// Le mock natif ne redefinit que ce qui depend du rendu : un export ajoute au theme doit y
// arriver tel quel, sans qu'il faille le recopier dans le mock.
it('laisse passer les exports du theme que le mock ne redefinit pas', () => {
  expect(sanitizeCSSKey('1,5V')).toBe(jest.requireActual('../../../theme/src').sanitizeCSSKey('1,5V'));
});
