import { renderHook } from '@testing-library/react-native';
import { useStyles } from './ToolbarTop.styles';
import {
  bordureDeLaBarre,
  dispositionDeLaBarre,
  styleDuBlocDInformation,
  styleDuSousTitre,
  styleDuTitre,
} from './toolbarTopStyling';

// Les decisions de style de la barre, prises hors rendu (ADR 0027) : jsdom n'a pas de moteur
// de mise en page, un style lu sur l'arbre rendu n'y valait que ce qu'il declarait.
const styles = async () => (await renderHook(() => useStyles())).result.current;

describe('la barre', () => {
  it('s empile quand la variante est large', async () => {
    expect(dispositionDeLaBarre(await styles(), 'large')).toMatchObject({
      flexDirection: 'column',
      alignItems: 'flex-start',
    });
  });

  it('s aligne en ligne par defaut', async () => {
    expect(dispositionDeLaBarre(await styles(), 'default')).toMatchObject({
      flexDirection: 'row',
      alignItems: 'center',
    });
  });

  it('se resserre quand la variante est compactLarge', async () => {
    expect(dispositionDeLaBarre(await styles(), 'compactLarge')).toMatchObject({
      paddingTop: 12,
      paddingBottom: 8,
      paddingLeft: 16,
    });
  });

  it('se souligne quand on le lui demande', async () => {
    expect(bordureDeLaBarre(await styles(), true)).toMatchObject({ borderBottomWidth: 1, borderTopWidth: 0 });
  });

  it('ne se souligne pas par defaut', async () => {
    expect(bordureDeLaBarre(await styles(), false)).not.toHaveProperty('borderBottomWidth');
  });
});

describe('le bloc d information', () => {
  // `compactLargeInformations` ne pose que des valeurs qui n'annulent rien de ce que la table de
  // base a deja mis : le test decrit le style applique, sans affirmer qu'il se voit.
  it('se centre en variante compactLarge', async () => {
    expect(styleDuBlocDInformation(await styles(), true)).toMatchObject({ justifyContent: 'center', paddingBottom: 0 });
  });

  // `large` et `compactLarge` disposent la barre autrement, mais grossissent le titre de la
  // meme facon : c'est la seule chose qu'elles partagent.
  it('grossit le titre et le sous-titre quand le titre est grand', async () => {
    const table = await styles();

    expect([styleDuTitre(table, true).fontSize, styleDuSousTitre(table, true).fontSize]).toEqual([40, 14]);
  });

  it('garde un titre discret par defaut', async () => {
    const table = await styles();

    expect([styleDuTitre(table, false).fontSize, styleDuSousTitre(table, false).fontSize]).toEqual([14, 12]);
  });

  // Le style de typographie passe apres celui de la variante : il sert justement a corriger ce
  // que la variante a decide, et l'inverse le rendrait inoperant.
  it('laisse l appelant reprendre la main sur le titre et le sous-titre', async () => {
    const table = await styles();

    expect([
      styleDuTitre(table, true, { fontSize: 9 }).fontSize,
      styleDuSousTitre(table, true, { fontSize: 9 }).fontSize,
    ]).toEqual([9, 9]);
  });
});
