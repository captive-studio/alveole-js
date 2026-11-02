import { Typography } from '@alveole/components';
import { within } from '@testing-library/react';
import { fiche } from '../../__tests__/helpers/fiche';
import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StorybookModule } from '../types';
import { ExemplesDeLaStory } from './ExemplesDeLaStory';

const Tailles = () => <Typography>Demonstration</Typography>;

const story: StorybookModule = {
  ...fiche,
  Sources: { storySources: { Tailles: 'const source = 1;' }, storyDescriptions: { Tailles: 'Trois tailles.' } },
};

describe('ExemplesDeLaStory', () => {
  // Le cliché d'un exemple cadre sa démonstration seule (ADR 0036) : retoucher le titre ou la
  // description ne doit changer aucune image.
  it('laisse le titre et la description hors du repere de la demonstration', () => {
    const { getByTestId } = renderScreen(
      <ExemplesDeLaStory story={story} exemples={[['Tailles', Tailles]]} gabarit={false} />,
    );

    const demonstration = getByTestId('demonstration-Tailles');

    expect(within(demonstration).getByText('Demonstration')).toBeTruthy();
    expect(within(demonstration).queryByText('Tailles')).toBeNull();
    expect(within(demonstration).queryByText('Trois tailles.')).toBeNull();
  });
});
