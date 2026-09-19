import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { EnTeteDeFiche } from './EnTeteDeFiche';

describe('EnTeteDeFiche', () => {
  it('affiche la description en gris mention, pas en gris par defaut', () => {
    const meta = { title: 'Titre', description: 'Une description.', tags: [], experimental: false, styleFn: () => '' };
    const { getByText } = renderScreen(<EnTeteDeFiche meta={meta} />);

    expect(getComputedStyle(getByText('Une description.')).color).toBe('var(--text-mention-grey)');
  });
});
