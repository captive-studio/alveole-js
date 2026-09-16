import { renderScreen } from '../../__tests__/helpers/renderScreen';
import { StorySummary } from './StorySummary';

describe('StorySummary', () => {
  // Le sommaire vise les ancres posees par AnchorHeading : s'il calcule le lien autrement,
  // il renvoie vers une ancre qui n'existe pas et la fiche ne bouge pas.
  it('pointe vers l ancre de chaque exemple', () => {
    const { getByRole } = renderScreen(<StorySummary exemples={['Tailles disponibles']} />);

    expect(getByRole('link', { name: 'Tailles disponibles' }).getAttribute('href')).toBe('#tailles-disponibles');
  });
});
