import { Platform } from 'react-native';
import { Elevations } from '../constants';
import { elevationStyle } from './elevationStyle';

jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

// Sur web, l'ombre n'est pas recalculee : elle renvoie a la variable CSS que le theme emet.
it('renvoie a la variable CSS de l elevation sur web', () => {
  jest.replaceProperty(Platform, 'OS', 'web');

  expect(elevationStyle('raised')).toEqual({ boxShadow: 'var(--elevation-raised)' });
});

// Le natif n'a pas de `box-shadow` : il recoit les proprietes d'ombre propres a React Native.
it('rend les proprietes d ombre natives hors web', () => {
  jest.replaceProperty(Platform, 'OS', 'ios');

  expect(elevationStyle('raised')).toEqual(Elevations.raised.mobile);
});
