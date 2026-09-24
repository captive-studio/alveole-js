import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { UIKitHomePage } from './UIKitHomePage';

const handlers = () => ({ onOpenComponents: jest.fn(), onOpenTheme: jest.fn(), onOpenConstants: jest.fn() });

// La page d'accueil n'est qu'un menu : chaque carte doit mener a sa section, et a elle seule.
describe('UIKitHomePage', () => {
  it('ouvre les composants depuis la carte Composants', () => {
    const props = handlers();
    renderScreen(<UIKitHomePage {...props} />);

    fireEvent.click(screen.getByText('Composants'));

    expect(props.onOpenComponents).toHaveBeenCalledTimes(1);
    expect(props.onOpenTheme).not.toHaveBeenCalled();
  });

  it('decrit chaque section sous son titre', () => {
    renderScreen(<UIKitHomePage {...handlers()} />);

    expect(screen.getByText('Liste des constantes de thème exposées par la librairie.')).toBeTruthy();
  });
});
