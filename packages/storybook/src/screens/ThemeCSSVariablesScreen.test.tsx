import { Toasts } from '@alveole/components';
import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { ThemeCSSVariablesScreen } from './ThemeCSSVariablesScreen';
import { buildGroups } from './variablesCSSDuTheme';

/** Chaque ligne copie son nom et l'annonce : l'ecran exige le fournisseur de notifications. */
const rendreLesVariables = () =>
  renderScreen(
    <Toasts>
      <ThemeCSSVariablesScreen />
    </Toasts>,
  );

describe('ThemeCSSVariablesScreen', () => {
  it('compte toutes les variables injectees', () => {
    const total = buildGroups().reduce((somme, groupe) => somme + groupe.vars.length, 0);
    rendreLesVariables();

    expect(screen.getByText(new RegExp(`^${total} variables injectées`))).toBeTruthy();
  });
});
