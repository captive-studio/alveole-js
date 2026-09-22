import { removeUnsupportedCSSProperties } from './removeUnsupportedCSSProperties';

jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

describe('removeUnsupportedCSSProperties sur iOS', () => {
  it('laisse intactes les propriétés supportées', () => {
    const styles = { bouton: { color: 'red', borderWidth: 2 } };

    expect(removeUnsupportedCSSProperties(styles)).toEqual({ bouton: { color: 'red', borderWidth: 2 } });
  });

  it('annule outlineWidth, que iOS ne supporte pas', () => {
    const styles = { bouton: { color: 'red', outlineWidth: 3 } };

    expect(removeUnsupportedCSSProperties(styles)).toEqual({ bouton: { color: 'red', outlineWidth: undefined } });
  });
});
