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

// Une nuance n'est pas un token : la page renvoie le lecteur vers ce qu'un composant doit lire.
it('rappelle en tete qu un composant lit un token semantique, lien vers la page des tokens', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({}))} />);

  expect(screen.getByRole('link', { name: 'tokens sémantiques' }).getAttribute('href')).toBe(
    '/theme/tokens-semantiques',
  );
});

/** Vrai si chaque morceau apparait dans le texte apres le precedent. */
const dansLOrdre = (texte: string, morceaux: string[]) =>
  morceaux.reduce((position, morceau) => (position < 0 ? -1 : texte.indexOf(morceau, position)), 0) >= 0;

it('range les echelles sous le titre de leur famille, dans l ordre Neutre, Marque, Statut, Accent', async () => {
  const cite = { tokens: ['light.text.a'] };
  const { container } = renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ ...cite, echelle: 'Inconnue' }),
        nuance({ ...cite, echelle: 'Focus' }),
        nuance({ ...cite, echelle: 'BleuCaptive' }),
        nuance({ ...cite, echelle: 'GrisPolaire' }),
        nuance({ ...cite, echelle: 'SlateGrey' }),
      )}
    />,
  );

  expect(
    dansLOrdre(container.textContent ?? '', [
      'Neutre',
      'GrisPolaire 900',
      'SlateGrey 900',
      'Marque',
      'BleuCaptive 900',
      'Statut',
      'Focus 900',
      'Accent',
      'Inconnue 900',
    ]),
  ).toBe(true);
});

// Un token deprecie suffit a garder l'echelle dans sa famille : seule une echelle que rien ne cite
// est hors du theme.
it('range a la fin, quelle que soit sa famille, une echelle qu aucun token ne cite', async () => {
  const { container } = renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ echelle: 'Focus' }),
        nuance({ echelle: 'Neutre', tokensDeprecies: ['border.base'] }),
        nuance({ echelle: 'Lilas', tokens: ['light.text.a'] }),
      )}
    />,
  );

  expect(
    dansLOrdre(container.textContent ?? '', [
      'Neutre 900',
      'Accent',
      'Lilas 900',
      'Non utilisées par le thème',
      'Focus 900',
    ]),
  ).toBe(true);
});
