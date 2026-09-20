import { FOCUS_ATTRIBUTE } from '../constants/Focus';
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

  // La frontiere du paquet, cf. docs/adr/0008 : il expose des variables, charge les polices,
  // et ne peint que ce qui lui appartient. Un morceau qui ciblerait `body`, `a` ou `button`
  // imposerait un rendu a l'application cliente au lieu de le lui laisser.
  //
  // La bague de focus est la troisieme forme admise, et la seule qui cible des elements :
  // elle ne s'applique qu'a ceux qui portent `FOCUS_ATTRIBUTE`, c'est-a-dire que le kit a
  // marques lui-meme. C'est ce qui la distingue d'un style global et ce qui la rend
  // compatible avec l'ADR : l'application cliente ne voit changer aucun de ses elements.
  it('ne peint que ce qui appartient au kit, jamais un element de l application', () => {
    const parts = generateThemeCSSParts();

    expect(
      parts.every(
        part => part.startsWith('@import') || part.startsWith(':root {') || part.startsWith(`[${FOCUS_ATTRIBUTE}`),
      ),
    ).toBe(true);
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

// La bague doit voyager avec le theme : les deux assembleurs (le `<style>` de
// `WebThemeStyles` et le `dist/default.css` du script de build) passent par ici, et une
// regle qui ne serait posee que par l'un des deux manquerait a la moitie des applications.
describe('bague de focus', () => {
  it('emet la regle de focus avec le reste du CSS du paquet', () => {
    expect(generateThemeCSSParts().some(part => part.includes(':focus-visible'))).toBe(true);
  });
});
