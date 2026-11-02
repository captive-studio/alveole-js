import { Typography } from '@alveole/components';
import { within } from '@testing-library/react';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { ExampleBlock } from './ExampleBlock';

const longue = Array.from({ length: 20 }, (_, index) => `const ligne${index} = ${index};`).join('\n');

describe('ExampleBlock', () => {
  it('propose de deplier quand la source depasse le seuil', () => {
    const { getByText } = renderScreen(
      <ExampleBlock nom="Longue" source={longue}>
        <Typography>Demonstration</Typography>
      </ExampleBlock>,
    );

    expect(getByText('Afficher tout')).toBeTruthy();
  });

  // Le cliché de régression cible ce repère (ADR 0036) : la source n'y entre pas, sans quoi
  // une ligne de code retouchée changerait l'image.
  it('isole la demonstration de sa source dans un repere nomme', () => {
    const { getByTestId } = renderScreen(
      <ExampleBlock nom="Variants" source="const source = 1;">
        <Typography>Demonstration</Typography>
      </ExampleBlock>,
    );

    const demonstration = getByTestId('demonstration-Variants');

    expect(within(demonstration).getByText('Demonstration')).toBeTruthy();
    expect(within(demonstration).queryByText(/const source/)).toBeNull();
  });
});
