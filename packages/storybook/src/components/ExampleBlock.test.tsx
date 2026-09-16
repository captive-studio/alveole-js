import { Typography } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { ExampleBlock } from './ExampleBlock';

const longue = Array.from({ length: 20 }, (_, index) => `const ligne${index} = ${index};`).join('\n');

/** La scene : la boite qui porte la demonstration, juste au-dessus d'elle. */
const sceneAutourDe = (demonstration: HTMLElement) => demonstration.parentElement!;

describe('ExampleBlock', () => {
  it('propose de deplier quand la source depasse le seuil', () => {
    const { getByText } = renderScreen(
      <ExampleBlock source={longue}>
        <Typography>Demonstration</Typography>
      </ExampleBlock>,
    );

    expect(getByText('Afficher tout')).toBeTruthy();
  });

  // Une demonstration posee sur le fond de la page flotte : rien ne dit ou finit le document
  // et ou commence ce qu'il montre. Le gris est deja pris par le bloc de code juste en
  // dessous, et le reprendre ici effacerait la frontiere entre ce qu'on montre et la facon
  // de l'ecrire. Une trame tient le role sans depenser une seconde valeur de fond.
  it('pose la demonstration sur une trame plutot que sur le fond de la page', () => {
    const { getByText } = renderScreen(
      <ExampleBlock>
        <Typography>Demonstration</Typography>
      </ExampleBlock>,
    );

    expect(window.getComputedStyle(sceneAutourDe(getByText('Demonstration'))).backgroundImage).toContain(
      'radial-gradient',
    );
  });
});
