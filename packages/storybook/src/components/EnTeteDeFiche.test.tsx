import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { EnTeteDeFiche } from './EnTeteDeFiche';

describe('EnTeteDeFiche', () => {
  it('affiche le titre et la description de la fiche', () => {
    const meta = { title: 'Titre', description: 'Une description.', tags: [], experimental: false, styleFn: () => '' };
    const { getByRole, getByText } = renderScreen(<EnTeteDeFiche meta={meta} />);

    expect(getByRole('heading', { name: 'Titre' })).toBeTruthy();
    expect(getByText('Une description.')).toBeTruthy();
  });
});
