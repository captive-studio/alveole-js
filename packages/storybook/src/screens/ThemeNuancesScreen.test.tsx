import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { ThemeNuancesScreen } from './ThemeNuancesScreen';

const nuance = (champs: Partial<Nuance>): Nuance => ({
  echelle: 'Neutre',
  numero: '900',
  hex: '#DDDDDD',
  tokens: [],
  tokensDeprecies: [],
  ...champs,
});

const catalogue = (...nuances: Nuance[]): CatalogueDesCouleurs => ({ tokens: [], nuances });

// #DDDDDD sur blanc : (1 + 0,05) / (0,7231 + 0,05) = 1,36, arrondi a une decimale.
it('montre chaque nuance avec son hex et son contraste sur blanc', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({}))} />);

  expect(screen.getByText('Neutre 900')).toBeTruthy();
  expect(screen.getByText('#DDDDDD')).toBeTruthy();
  expect(screen.getByText('1,4:1 sur blanc')).toBeTruthy();
});

it('liste sous la nuance les tokens qui la citent, chacun lie a sa ligne', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ tokens: ['light.border.default-grey'] }))} />);

  expect(screen.getByRole('link', { name: 'light.border.default-grey' }).getAttribute('href')).toBe(
    '/theme/tokens-semantiques#light.border.default-grey',
  );
});

// Une nuance qui ne sert plus qu'a du code ancien se distingue d'une nuance vivante.
it('liste a part les tokens deprecies qui citent la nuance', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ tokensDeprecies: ['border.base'] }))} />);

  expect(screen.getByText('Déprécié')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'border.base' }).getAttribute('href')).toBe(
    '/theme/tokens-semantiques#border.base',
  );
});

// Un token deprecie ne fait pas vivre une nuance : elle reste candidate a la depreciation.
it('marque sans usage une nuance qu aucun token actif ne cite', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ numero: '50', tokensDeprecies: ['border.base'] }),
        nuance({ tokens: ['light.border.default-grey'] }),
      )}
    />,
  );

  expect(screen.getAllByText('sans usage')).toHaveLength(1);
});
