import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { ThemeTypographyScreen } from './ThemeTypographyScreen';

const typography = { Titres: { H1: { fontSize: 40, lineHeight: 48, fontFamily: 'Marianne' } } };

describe('ThemeTypographyScreen', () => {
  it('range chaque style sous sa categorie', () => {
    renderScreen(<ThemeTypographyScreen typography={typography} />);

    expect(screen.getByText('Titres')).toBeTruthy();
    expect(screen.getByText('H1')).toBeTruthy();
  });

  it('titre la page par defaut', () => {
    renderScreen(<ThemeTypographyScreen typography={{}} />);

    expect(screen.getAllByText('UI Kit - Theme typography').length).toBeGreaterThan(0);
  });
});
