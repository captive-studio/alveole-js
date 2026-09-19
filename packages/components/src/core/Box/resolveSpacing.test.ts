import { resolveSpacing } from './resolveSpacing';

describe('resolveSpacing', () => {
  it('retourne un nombre inchangé', () => {
    expect(resolveSpacing(16)).toBe(16);
  });

  it('résout une clé de spacing en valeur numérique', () => {
    expect(resolveSpacing('2W')).toBe(16);
  });
});
