import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { ThemeConstantDetailScreen } from './ThemeConstantDetailScreen';

describe('ThemeConstantDetailScreen', () => {
  it('detaille chaque entree de la constante sous son nom', () => {
    renderScreen(<ThemeConstantDetailScreen name="rayons" value={{ petit: 4, grand: 16 }} />);

    expect(screen.getByText('petit')).toBeTruthy();
    expect(screen.getByText('grand')).toBeTruthy();
  });

  // Une constante scalaire n'a pas d'entrees a nommer : sa valeur s'affiche seule.
  it('affiche telle quelle une constante scalaire', () => {
    renderScreen(<ThemeConstantDetailScreen name="opacite" value={0.42} />);

    expect(screen.getByText('0.42')).toBeTruthy();
  });
});
