import { renderWeb } from '@/__tests__/helpers/renderWeb';
import { Typography } from '../Typography';
import { PageBackground } from './PageBackground';

describe('PageBackground', () => {
  // Le fond d'une page est une surface du design system, pas un effet : un degrade fait
  // varier la couleur selon la hauteur, donc aucun contenu pose dessus ne peut s'accorder
  // a une valeur de la palette.
  it('pose une surface unie, sans degrade', async () => {
    const { container } = renderWeb(
      <PageBackground>
        <Typography>Contenu</Typography>
      </PageBackground>,
    );

    const degrades = Array.from(container.querySelectorAll<HTMLElement>('*')).filter(element =>
      window.getComputedStyle(element).backgroundImage.includes('gradient'),
    );

    expect(degrades).toEqual([]);
  });
});
