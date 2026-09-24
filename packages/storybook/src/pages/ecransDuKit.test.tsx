import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { HomeScreen } from './ecransDuKit';

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
