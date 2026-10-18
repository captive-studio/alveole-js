import { ViewProps } from '@tamagui/core';
import { pseudoEtatsTamagui } from './pseudoEtatsTamagui';

test('isole les pseudo-etats des autres props', () => {
  const survol = { backgroundColor: 'red' };
  const pression = { opacity: 0.5 };

  expect(pseudoEtatsTamagui<ViewProps>()({ hoverStyle: survol, pressStyle: pression, id: 'x' })).toEqual({
    pseudoEtats: { hoverStyle: survol, pressStyle: pression },
    autres: { id: 'x' },
  });
});

test('accepte un survol deja au type de la cible Tamagui', () => {
  const survol: ViewProps['hoverStyle'] = { backgroundColor: 'red' };

  expect(pseudoEtatsTamagui<ViewProps>()({ hoverStyle: survol }).pseudoEtats.hoverStyle).toBe(survol);
});
