import { generateThemeCSSParts } from './injectVariableCSS';

jest.mock('react-native', () => ({ Platform: { OS: 'web', select: (obj: Record<string, unknown>) => obj.web } }));

describe('generateThemeCSSParts', () => {
  // L'@import doit rester en tete : une regle CSS placee avant lui rendrait la feuille
  // invalide et le navigateur ignorerait l'import des polices.
  it('reunit les morceaux de CSS du paquet, les polices en tete', () => {
    const parts = generateThemeCSSParts();

    expect(parts[0]).toMatch(/^@import/);
    expect(parts.some(part => part.includes(':root {'))).toBe(true);
  });

  // La frontiere du paquet, cf. docs/adr/0008 : il expose des variables et charge les
  // polices, il ne style rien. Un morceau qui ciblerait `body` ou un autre element
  // imposerait un rendu a l'application cliente au lieu de le lui laisser.
  it('n emet que des variables et l import des polices, jamais un style d element', () => {
    const parts = generateThemeCSSParts();

    expect(parts.every(part => part.startsWith('@import') || part.startsWith(':root {'))).toBe(true);
  });
});

// Filet du refactoring de `collectTypographyLines`. Chaque ligne manquante ici est une
// variable CSS que le navigateur ne trouvera plus : la regle qui l'utilise retombe en
// silence sur son heritage, sans erreur ni avertissement nulle part.
describe('variables de typographie', () => {
  const typographyLines = () =>
    generateThemeCSSParts()[1]
      .split('\n')
      .filter(line => line.includes('--typography-'));

  it('emet exactement les memes variables qu avant le refactoring', () => {
    expect(typographyLines()).toMatchSnapshot();
  });
});
