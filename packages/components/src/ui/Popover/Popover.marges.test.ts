import { margesDePopover } from './Popover.marges';

describe('margesDePopover', () => {
  it('decale vers la droite un popover ancre a gauche', () => {
    expect(margesDePopover('left', '1V')).toEqual({ mr: '1V' });
  });

  it('decale vers le bas un popover ancre en haut', () => {
    expect(margesDePopover('top', '1V')).toEqual({ mb: '1V' });
  });

  it('decale vers la gauche un popover ancre a droite', () => {
    expect(margesDePopover('right', '1V')).toEqual({ ml: '1V' });
  });

  it('decale vers le haut un popover ancre en bas', () => {
    expect(margesDePopover('bottom', '1V')).toEqual({ mt: '1V' });
  });

  it("ne decale rien quand aucun ancrage n'est demande", () => {
    expect(margesDePopover(undefined, '1V')).toEqual({});
  });
});
