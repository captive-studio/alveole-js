import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { UIKitThemePage } from './UIKitThemePage';

const handlers = () => ({ onOpenColors: jest.fn(), onOpenTypography: jest.fn() });

describe('UIKitThemePage', () => {
  it('ouvre les couleurs depuis la carte Couleurs', () => {
    const props = handlers();
    renderScreen(<UIKitThemePage {...props} />);

    fireEvent.click(screen.getByText('Couleurs'));

    expect(props.onOpenColors).toHaveBeenCalledTimes(1);
    expect(props.onOpenTypography).not.toHaveBeenCalled();
  });

  it('ouvre les typographies depuis leur carte', () => {
    const props = handlers();
    renderScreen(<UIKitThemePage {...props} />);

    fireEvent.click(screen.getByText('Typographies'));

    expect(props.onOpenTypography).toHaveBeenCalledTimes(1);
    expect(props.onOpenColors).not.toHaveBeenCalled();
  });

  // Les variables CSS n'existent que sur le web : sans moyen de les ouvrir, la carte serait
  // une impasse.
  it('ne propose les variables CSS que si on sait les ouvrir', () => {
    renderScreen(<UIKitThemePage {...handlers()} />);

    expect(screen.queryByText('Variables CSS')).toBeNull();
  });

  it('ouvre les variables CSS quand on sait les ouvrir', () => {
    const onOpenCSSVariables = jest.fn();
    renderScreen(<UIKitThemePage {...handlers()} onOpenCSSVariables={onOpenCSSVariables} />);

    fireEvent.click(screen.getByText('Variables CSS'));

    expect(onOpenCSSVariables).toHaveBeenCalledTimes(1);
  });

  it('montre le contenu place avant les cartes', () => {
    renderScreen(<UIKitThemePage {...handlers()} beforeContent={<span>Retour</span>} />);

    expect(screen.getByText('Retour')).toBeTruthy();
  });
});
