import { Typography } from '@alveole/components';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { ExampleBlock } from './ExampleBlock';

const longue = Array.from({ length: 20 }, (_, index) => `const ligne${index} = ${index};`).join('\n');

describe('ExampleBlock', () => {
  it('propose de deplier quand la source depasse le seuil', () => {
    const { getByText } = renderScreen(
      <ExampleBlock source={longue}>
        <Typography>Demonstration</Typography>
      </ExampleBlock>,
    );

    expect(getByText('Afficher tout')).toBeTruthy();
  });
});
