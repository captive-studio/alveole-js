import { versStyleNatif } from './versStyleNatif';

test('transmet le style tel quel, sans le transformer', () => {
  const cadre = { padding: 'var(--spacing-4V)', outline: 'none' };

  expect(versStyleNatif(cadre)).toBe(cadre);
});
