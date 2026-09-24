import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { ThemeConstantsScreen } from './ThemeConstantsScreen';

describe('ThemeConstantsScreen', () => {
  it('transmet la constante choisie avec sa valeur', () => {
    const onSelectConstant = jest.fn();
    renderScreen(
      <ThemeConstantsScreen constants={{ grilles: { gouttiere: 16 } }} onSelectConstant={onSelectConstant} />,
    );

    fireEvent.click(screen.getByText('grilles'));

    expect(onSelectConstant).toHaveBeenCalledWith({ name: 'grilles', value: { gouttiere: 16 } });
  });

  it('titre la page par defaut', () => {
    renderScreen(<ThemeConstantsScreen constants={{}} />);

    expect(screen.getAllByText('UI Kit - Constants').length).toBeGreaterThan(0);
  });
});
