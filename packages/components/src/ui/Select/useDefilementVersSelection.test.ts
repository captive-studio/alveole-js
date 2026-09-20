import { SELECT_ROW_HEIGHT } from './SelectList.styles';
import { positionDeDefilement } from './useDefilementVersSelection';

describe('positionDeDefilement', () => {
  it('laisse voir les deux lignes qui précèdent l’option sélectionnée', () => {
    expect(positionDeDefilement(10 * SELECT_ROW_HEIGHT)).toBe(8 * SELECT_ROW_HEIGHT);
  });

  it('ne remonte jamais au-dessus du haut de la liste', () => {
    expect(positionDeDefilement(SELECT_ROW_HEIGHT)).toBe(0);
  });
});
