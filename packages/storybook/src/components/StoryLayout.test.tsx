import { Typography } from '@alveole/components';
import { Grilles } from '@alveole/theme';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StoryLayout } from './StoryLayout';

const rendu = (largeur = 1440) =>
  renderScreen(
    <StoryLayout sommaire={<Typography>Sur cette page</Typography>}>
      <Typography>Corps de la fiche</Typography>
    </StoryLayout>,
    { largeur },
  );

/** L'enveloppe porte les marges de page ; la zone qu'elle centre est son unique enfant. */
const enveloppeDe = (corps: HTMLElement) =>
  window.getComputedStyle(corps.parentElement!.parentElement!.parentElement!.parentElement!);

describe('StoryLayout', () => {
  // La lecture n'a pas de largeur propre : elle prend ce que la zone laisse une fois le
  // sommaire servi. Sans minWidth: 0, un bloc de code large refuse de retrecir et deborde.
  it('donne au corps ce qui reste de la zone, sans l empecher de retrecir', () => {
    const { getByText } = rendu();
    const colonne = window.getComputedStyle(getByText('Corps de la fiche').parentElement!);

    // React Native pose flexShrink: 0 par defaut, a l'inverse du CSS : sans le dire, la
    // colonne garde la largeur de son contenu et deborde de la zone.
    expect({ flexGrow: colonne.flexGrow, flexShrink: colonne.flexShrink, minWidth: colonne.minWidth }).toEqual({
      flexGrow: '1',
      flexShrink: '1',
      minWidth: '0px',
    });
  });

  // Le sommaire a une largeur propre, deux colonnes de la grille, et ne la cede pas : c'est
  // lui qui explique pourquoi la lecture s'arrete a sept colonnes plutot qu'a neuf.
  it('sert au sommaire deux colonnes de la grille', () => {
    const { getByText } = rendu();
    const volet = window.getComputedStyle(getByText('Sur cette page').parentElement!);

    expect({ width: volet.width, flexShrink: volet.flexShrink }).toEqual({
      width: `${Grilles['2 colonnes']}px`,
      flexShrink: '0',
    });
  });

  // La zone vaut neuf colonnes : sept de lecture, une gouttiere, deux de sommaire. Le
  // sommaire est declare avant le corps et rendu a droite, comme le fait le theme de
  // documentation de Primer, pour qu'il reste atteignable sans traverser toute la fiche.
  it('pose une zone de neuf colonnes ou le sommaire passe a droite', () => {
    const { getByText } = rendu();
    const rangee = getByText('Corps de la fiche').parentElement!.parentElement!;
    const zone = window.getComputedStyle(rangee.parentElement!);

    expect({
      maxWidth: zone.maxWidth,
      flexDirection: window.getComputedStyle(rangee).flexDirection,
      gap: window.getComputedStyle(rangee).gap,
    }).toEqual({ maxWidth: `${Grilles['9 colonnes']}px`, flexDirection: 'row-reverse', gap: '24px' });
  });

  // Une fiche sans exemple n'a rien a sommairiser : le volet ne doit pas rester en place
  // a vide, sinon la lecture perd deux colonnes pour rien.
  it('rend la zone entiere au corps quand il n y a pas de sommaire', () => {
    const { getByText } = renderScreen(
      <StoryLayout>
        <Typography>Corps de la fiche</Typography>
      </StoryLayout>,
    );

    expect(getByText('Corps de la fiche').parentElement!.parentElement!.children).toHaveLength(1);
  });

  // Primer et Atlassian laissent 55 a 66 px entre la colonne de navigation et le contenu, et
  // 96 a 100 au-dessus du titre : deux fois ce que posait externalPadding, qui est le padding
  // d'une application cliente, pas celui d'une page de documentation. Et chez les deux le
  // vide est symetrique : la zone se centre au lieu de se plaquer a gauche.
  it('centre la zone et garde une marge minimale autour d elle', () => {
    const { getByText } = rendu();
    const corps = getByText('Corps de la fiche');
    const zone = corps.parentElement!.parentElement!.parentElement!;
    const enveloppe = enveloppeDe(corps);

    expect({
      gauche: enveloppe.paddingLeft,
      droite: enveloppe.paddingRight,
      haut: enveloppe.paddingTop,
      centrage: window.getComputedStyle(zone).marginLeft,
    }).toEqual({ gauche: '48px', droite: '48px', haut: '96px', centrage: 'auto' });
  });

  // 48 de chaque cote sur un telephone, c'est un quart de la page rendu au vide avant meme
  // que le sommaire prenne sa part. Le theme publie deja cette bascule pour le padding de ses
  // blocs : la marge de page suit la meme, avec les valeurs d'une page de documentation.
  it('resserre ses marges quand la page n a pas la largeur de les porter', () => {
    const { getByText } = rendu(375);
    const enveloppe = enveloppeDe(getByText('Corps de la fiche'));

    expect({ gauche: enveloppe.paddingLeft, droite: enveloppe.paddingRight, haut: enveloppe.paddingTop }).toEqual({
      gauche: '24px',
      droite: '24px',
      haut: '48px',
    });
  });
});

describe('StoryLayout, sur une page trop etroite pour deux colonnes', () => {
  // Mesure au navigateur a 768 : le sommaire garde ses 180 px et ne laisse que 468 px a des
  // blocs de code. Le theme de documentation de Primer retire sa table des matieres plutot
  // que de la comprimer, et rend la largeur a ce que la page documente.
  it('retire le sommaire au profit de la lecture', () => {
    const { getByText, queryByText } = rendu(768);

    expect({
      sommaire: queryByText('Sur cette page'),
      colonnes: getByText('Corps de la fiche').parentElement!.parentElement!.children.length,
    }).toEqual({ sommaire: null, colonnes: 1 });
  });
});
