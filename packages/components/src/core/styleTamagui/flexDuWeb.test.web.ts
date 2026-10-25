import { correctionFlexDuWeb } from './flexDuWeb';

describe('correctionFlexDuWeb', () => {
  it('retablit la base en pourcentage pour un flex passe en prop', () => {
    expect(correctionFlexDuWeb(undefined, 1)).toEqual({ flexGrow: 1, flexShrink: 1, flexBasis: '0%' });
  });
});
