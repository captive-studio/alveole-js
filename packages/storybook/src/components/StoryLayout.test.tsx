import { Typography } from '@alveole/components';
import { Grilles } from '@alveole/theme';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StoryLayout } from './StoryLayout';

const rendu = () =>
  renderScreen(
    <StoryLayout sommaire={<Typography>Sur cette page</Typography>}>
      <Typography>Corps de la fiche</Typography>
    </StoryLayout>,
  );

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
    const zone = getByText('Corps de la fiche').parentElement!.parentElement!.parentElement!;
    const enveloppe = window.getComputedStyle(zone.parentElement!);

    expect({
      gauche: enveloppe.paddingLeft,
      droite: enveloppe.paddingRight,
      haut: enveloppe.paddingTop,
      centrage: window.getComputedStyle(zone).marginLeft,
    }).toEqual({ gauche: '48px', droite: '48px', haut: '96px', centrage: 'auto' });
  });
});
