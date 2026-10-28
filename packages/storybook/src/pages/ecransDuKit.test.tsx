import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { HomeScreen, InternalHeader } from './ecransDuKit';

const handlers = () => ({
  onOpenComponents: jest.fn(),
  onOpenTheme: jest.fn(),
  onOpenConstants: jest.fn(),
  onOpenBlank: jest.fn(),
  onOpenPhilosophy: jest.fn(),
});

describe('HomeScreen', () => {
  it('ouvre la philosophie depuis sa carte', () => {
    const props = handlers();
    renderScreen(<HomeScreen title="UI Kit" description="Accueil" {...props} />);

    fireEvent.click(screen.getByText('Philosophie'));

    expect(props.onOpenPhilosophy).toHaveBeenCalledTimes(1);
    expect(props.onOpenComponents).not.toHaveBeenCalled();
  });
});

describe('InternalHeader', () => {
  it('ramene a l ecran precedent quand on peut revenir', () => {
    const onBack = jest.fn();
    renderScreen(<InternalHeader canGoBack onBack={onBack} />);

    fireEvent.click(screen.getByText('Retour'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  // Sur le premier ecran, un bouton Retour ne menerait nulle part.
  it('ne montre rien quand il n y a pas d ecran precedent', () => {
    renderScreen(<InternalHeader canGoBack={false} onBack={jest.fn()} />);

    expect(screen.queryByText('Retour')).toBeNull();
  });
});
