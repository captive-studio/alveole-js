import { contrastRatio, CustomPalette, MonospaceFont, RadiusList } from '@alveole/theme';
import { renderHook } from '@testing-library/react-native';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStyles } from './Highlight.styles';
import { feuilleDeColoration, styleDeLaSurface, styleDuTexteDeBase, styleNatif } from './Highlight.theme';

// Les decisions de style de Highlight, prises hors rendu (ADR 0027) : la feuille de
// coloration, la surface et le texte de base se calculent sans monter le composant.
const FOND = CustomPalette.light.background['alt-grey'];
const SEUIL_AA = 4.5;

const styles = async () => (await renderHook(() => useStyles())).result.current;
const feuille = () => feuilleDeColoration(ghcolors, FOND);

const surface = async (variant: 'standalone' | 'embedded' = 'standalone', style = {}) =>
  styleDeLaSurface(await styles(), feuille(), { variant, styleFourni: styleNatif(style) });

describe('la feuille de coloration', () => {
  // Les palettes de coloration sont ecrites pour des editeurs, pas pour WCAG : celle de
  // ghcolors descendait a 2,56 sur nos noms de proprietes. Le cliquet du catalogue est a
  // zero violation, donc aucune teinte ne peut rester sous le seuil.
  it('ne laisse aucune couleur de jeton sous le seuil de contraste', () => {
    const couleurs = Object.values(feuille())
      .map(style => style.color)
      .filter((couleur): couleur is string => typeof couleur === 'string');

    expect(couleurs.filter(couleur => contrastRatio(couleur, FOND) < SEUIL_AA)).toEqual([]);
  });

  // Le theme ne fournit que des couleurs de texte : ses surlignages recouvriraient le fond
  // pose par le design system.
  it('ne laisse aucun fond sur les jetons de code', () => {
    expect(Object.values(feuille()).filter(style => style.backgroundColor)).toEqual([]);
  });

  // Une source rendue en police proportionnelle ne laisse plus rien s'aligner.
  it('rend le code en police a chasse fixe', () => {
    expect(styleDuTexteDeBase(feuille()).fontFamily).toBe(MonospaceFont.fontFamily);
  });
});

describe('la surface', () => {
  // La surface ne depend pas du langage : deux langages se rendent donc sur le meme fond.
  it('pose la surface du design system, pas celle du theme de coloration', async () => {
    expect((await surface()).backgroundColor).toBe(FOND);
  });

  it('arrondit la surface sur un rayon du theme', async () => {
    expect((await surface()).borderRadius).toBe(RadiusList.md);
  });

  // Le bloc ne suppose pas la couleur derriere lui : pose sur une surface de meme gris, il
  // disparaitrait sans ce lisere.
  it('borde la surface pour la detacher de son support', async () => {
    expect(await surface()).toMatchObject({ borderWidth: 1, borderColor: CustomPalette.light.border['default-grey'] });
  });

  // Compose dans un cadre qui le contient deja, le lisere ferait une seconde bordure emboitee.
  it('renonce a son lisere quand il est compose dans un cadre', async () => {
    expect((await surface('embedded')).borderWidth).toBeFalsy();
  });
});

// Le style fourni est du CSS : seules les valeurs que le natif connait doivent lui parvenir.
describe('le style fourni', () => {
  // React Native ne connait que `normal` et `italic`.
  it('ecarte un style de police que le natif ne connait pas', async () => {
    expect((await surface('standalone', { fontStyle: 'oblique' })).fontStyle).toBeUndefined();
  });

  // `bolder` et `lighter` sont relatifs a l'element parent, notion que le natif n'a pas.
  it('ecarte une graisse que le natif ne connait pas', async () => {
    expect((await surface('standalone', { fontWeight: 'bolder' })).fontWeight).toBeUndefined();
  });

  it('transmet une graisse et un style que le natif connait', async () => {
    expect(await surface('standalone', { fontWeight: 600, fontStyle: 'italic' })).toMatchObject({
      fontWeight: 600,
      fontStyle: 'italic',
    });
  });
});
