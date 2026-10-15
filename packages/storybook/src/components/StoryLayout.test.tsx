import { Typography } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StoryLayout } from './StoryLayout';

const rendu = (largeur: number) =>
  renderScreen(
    <StoryLayout sommaire={<Typography>Sur cette page</Typography>}>
      <Typography>Corps de la fiche</Typography>
    </StoryLayout>,
    { largeur },
  );

describe('StoryLayout', () => {
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
