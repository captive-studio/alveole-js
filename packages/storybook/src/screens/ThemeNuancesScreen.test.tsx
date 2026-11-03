import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { ThemeNuancesScreen } from './ThemeNuancesScreen';

const nuance = (champs: Partial<Nuance>): Nuance => ({
  echelle: 'Neutre',
  numero: '900',
  hex: '#DDDDDD',
  deprecie: false,
  tokens: [],
  tokensDeprecies: [],
  ...champs,
});

const catalogue = (...nuances: Nuance[]): CatalogueDesCouleurs => ({ tokens: [], nuances });

/** Selectionne la nuance de la bande par son nom, `Neutre 900`. */
const selectionner = (nom: string) => fireEvent.click(screen.getByRole('button', { name: nom }));

// La page s'ouvre sur la vue d'ensemble : aucun detail tant qu'on n'a rien choisi.
it('n affiche aucun detail a l ouverture', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({}))} />);

  expect(screen.queryByText('#DDDDDD')).toBeNull();
});

// #DDDDDD sur blanc : (1 + 0,05) / (0,7231 + 0,05) = 1,36, arrondi a une decimale.
it('detaille la nuance selectionnee : nom, hex et contraste sur blanc', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({}))} />);

  selectionner('Neutre 900');

  expect(screen.getByText('Neutre 900')).toBeTruthy();
  expect(screen.getByText('#DDDDDD')).toBeTruthy();
  expect(screen.getByText('1,4:1 sur blanc')).toBeTruthy();
});

it('liste sous la nuance les tokens qui la citent, chacun lie a sa ligne', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ tokens: ['light.border.default-grey'] }))} />);

  selectionner('Neutre 900');

  expect(screen.getByRole('link', { name: 'light.border.default-grey' }).getAttribute('href')).toBe(
    '/theme/tokens-semantiques#light.border.default-grey',
  );
});

// Une nuance qui ne sert plus qu'a du code ancien se distingue d'une nuance vivante.
it('liste a part les tokens deprecies qui citent la nuance', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ tokensDeprecies: ['border.base'] }))} />);

  selectionner('Neutre 900');

  expect(screen.getByText('Déprécié')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'border.base' }).getAttribute('href')).toBe(
    '/theme/tokens-semantiques#border.base',
  );
});

// Un token deprecie ne fait pas vivre une nuance : elle reste candidate a la depreciation.
it('marque sans usage une nuance qu aucun token actif ne cite', async () => {
  renderScreen(
    <ThemeNuancesScreen catalogue={catalogue(nuance({ numero: '50', tokensDeprecies: ['border.base'] }))} />,
  );

  selectionner('Neutre 50');

  expect(screen.getByText('sans usage')).toBeTruthy();
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
      'GrisPolaire',
      'SlateGrey',
      'Marque',
      'BleuCaptive',
      'Statut',
      'Focus',
      'Accent',
      'Inconnue',
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
    dansLOrdre(container.textContent ?? '', ['Neutre', 'Accent', 'Lilas', 'Non utilisées par le thème', 'Focus']),
  ).toBe(true);
});

// Lilas numerote vers le fonce, VertPrairie vers le clair : la bande ne lit que la luminosite.
it('range les nuances d une echelle du plus clair au plus fonce, quel que soit le numero', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ echelle: 'Lilas', numero: '100', hex: '#222222' }),
        nuance({ echelle: 'Lilas', numero: '200', hex: '#EEEEEE' }),
        nuance({ echelle: 'Lilas', numero: '300', hex: '#888888' }),
      )}
    />,
  );

  expect(screen.getAllByRole('button').map(bouton => bouton.textContent)).toEqual(['200', '300', '100']);
});

it('distingue sur la bande la nuance selectionnee', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ numero: '50' }), nuance({}))} />);

  selectionner('Neutre 900');

  expect(screen.getByRole('button', { pressed: true }).textContent).toBe('900');
});

// La bande ne montre que la progression : une cle qui n'est pas un cran vit sous elle.
it('affiche sous la bande, marquee hors echelle, une cle non numerique', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(nuance({ numero: '50' }), nuance({ numero: 'main-646', hex: '#0379EF' }))}
    />,
  );

  expect(screen.getAllByRole('button').map(bouton => bouton.getAttribute('aria-label'))).toEqual([
    'Neutre 50',
    'Neutre main-646 hors échelle',
  ]);
});

// Un cran deprecie ne compte plus dans la progression : il quitte la bande, sans disparaitre.
it('affiche sous la bande, marque deprecie, un cran deprecie', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ echelle: 'VertPrairie', numero: '300', hex: '#9EED61', deprecie: true }),
        nuance({ echelle: 'VertPrairie', numero: '75', hex: '#0B220B' }),
      )}
    />,
  );

  expect(screen.getAllByRole('button').map(bouton => bouton.getAttribute('aria-label'))).toEqual([
    'VertPrairie 75',
    'VertPrairie 300 déprécié',
  ]);
});

it('detaille une nuance hors de la bande comme les autres', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ echelle: 'BleuCaptive', numero: 'main-646', hex: '#0379EF', tokens: ['light.text.action-high-blue'] }),
      )}
    />,
  );

  selectionner('BleuCaptive main-646 hors échelle');

  expect(screen.getByText('#0379EF')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'light.text.action-high-blue' })).toBeTruthy();
});

// #DDDDDD sur #000000 : (0,7231 + 0,05) / (0 + 0,05) = 15,46, arrondi a une decimale.
it('detaille le contraste de la nuance sur la plus foncee de son echelle', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ numero: '50' }), nuance({ hex: '#000000' }))} />);

  selectionner('Neutre 50');

  expect(screen.getByText('15,5:1 sur Neutre 900')).toBeTruthy();
});

it('nomme une nuance sous la bande avec son marquage', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ numero: 'main-646', hex: '#0379EF' }))} />);

  expect(screen.getByRole('button', { name: 'Neutre main-646 hors échelle' })).toBeTruthy();
});

// #DDDDDD sur #222222 : (0,7231 + 0,05) / (0,0160 + 0,05) = 11,7. Seule la bande sert de reference : une nuance hors de la bande, meme plus foncee, n'en est pas une.
it('ne prend pas une nuance hors de la bande pour reference du contraste', async () => {
  renderScreen(
    <ThemeNuancesScreen
      catalogue={catalogue(
        nuance({ numero: '50' }),
        nuance({ hex: '#222222' }),
        nuance({ numero: '1000', hex: '#000000', deprecie: true }),
        nuance({ numero: 'main-1', hex: '#000000' }),
      )}
    />,
  );

  selectionner('Neutre 50');

  expect(screen.getByText('11,7:1 sur Neutre 900')).toBeTruthy();
});

// Le contraste d'une nuance sur elle-meme vaut toujours 1:1 : la ligne n'apprend rien.
it('ne detaille pas le contraste de la plus foncee sur elle-meme', async () => {
  renderScreen(<ThemeNuancesScreen catalogue={catalogue(nuance({ numero: '50' }), nuance({ hex: '#000000' }))} />);

  selectionner('Neutre 900');

  expect(screen.queryByText(/sur Neutre 900/)).toBeNull();
});

it('marque hors echelle et deprecie une cle non numerique depreciee', async () => {
  renderScreen(
    <ThemeNuancesScreen catalogue={catalogue(nuance({ numero: 'main-646', hex: '#0379EF', deprecie: true }))} />,
  );

  expect(screen.getByRole('button', { name: 'Neutre main-646 hors échelle, déprécié' })).toBeTruthy();
});
