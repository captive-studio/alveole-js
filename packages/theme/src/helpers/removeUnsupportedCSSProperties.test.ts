import { Platform } from 'react-native';
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

// Seul iOS a une liste d'exclusions : une plateforme qui n'en a pas garde tous ses styles.
it('laisse intacts les styles d une plateforme sans exclusion', () => {
  jest.replaceProperty(Platform, 'OS', 'android');

  expect(removeUnsupportedCSSProperties({ bouton: { outlineWidth: 3 } })).toEqual({ bouton: { outlineWidth: 3 } });
});
