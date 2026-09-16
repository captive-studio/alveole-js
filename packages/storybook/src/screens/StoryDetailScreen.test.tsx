import { Typography } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StorybookModule } from '../types';
import { StoryDetailScreen } from './StoryDetailScreen';

const fiche = {
  default: {
    title: 'Bouton',
    tags: ['Composant'],
    experimental: false,
    description: 'Un bouton.',
    styleFn: () => ({}),
  },
  Tailles: () => <Typography>Trois tailles</Typography>,
} as unknown as StorybookModule;

const aUneBordure = (element: HTMLElement) => {
  const largeur = window.getComputedStyle(element).borderTopWidth;

  return largeur !== '' && largeur !== '0px' && largeur !== 'medium';
};

const cadresAutourDe = (element: HTMLElement | null) => {
  const cadres: HTMLElement[] = [];

  for (let courant = element?.parentElement ?? null; courant; courant = courant.parentElement) {
    if (aUneBordure(courant)) cadres.push(courant);
  }

  return cadres;
};

describe('StoryDetailScreen', () => {
  // Le titre d'un exemple appartient au document, pas a la demonstration : il doit pouvoir
  // etre ancre et repris dans un sommaire. Seul ce qui est montre entre dans le cadre.
  it('laisse le titre de l exemple hors du cadre', async () => {
    const { getByText } = renderScreen(<StoryDetailScreen story={fiche} />);

    expect(cadresAutourDe(getByText('Tailles'))).toEqual([]);
  });
});
