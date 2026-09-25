import { buildSections, compteDeJetons, flattenColors, sectionsOuvertesAuDepart } from './paletteSections';

it('aplatit les couleurs en chemins pointes', () => {
  const entries = flattenColors({ text: { action: { high: '#0055FF' } } });

  expect(entries).toEqual([{ path: 'text.action.high', value: '#0055FF' }]);
});

it('prefixe les chemins quand on lui donne une racine', () => {
  const entries = flattenColors({ 'title-grey': '#151617' }, 'light.text');

  expect(entries).toEqual([{ path: 'light.text.title-grey', value: '#151617' }]);
});

// Une palette peut porter autre chose que des couleurs : des rayons, des durees, des nombres.
// Seule une feuille de texte est une couleur affichable.
it('ignore ce qui n est ni une couleur ni un groupe', () => {
  const entries = flattenColors({ epaisseur: 2, absente: null, couleur: '#FFF' });

  expect(entries).toEqual([{ path: 'couleur', value: '#FFF' }]);
});

it('fait une section par famille du mode clair', () => {
  const sections = buildSections({ light: { text: { a: '#1' }, border: { b: '#2' } } });

  expect(sections.map(s => s.title)).toEqual(['light / text', 'light / border']);
});

it('laisse de cote les autres modes', () => {
  const sections = buildSections({ light: { text: { a: '#1' } }, dark: { text: { a: '#2' } } });

  expect(sections.map(s => s.title)).toEqual(['light / text']);
});

it('ne fait pas de section pour une famille vide', () => {
  const sections = buildSections({ light: { text: {}, border: { b: '#2' } } });

  expect(sections.map(s => s.title)).toEqual(['light / border']);
});

it('rassemble les cles historiques en une seule section, en dernier', () => {
  const sections = buildSections({ light: { text: { a: '#1' } }, primary: '#2', system: { danger: '#3' } });

  expect(sections[sections.length - 1]).toEqual({
    title: 'Deprecated',
    deprecated: true,
    entries: [
      { path: 'primary', value: '#2' },
      { path: 'system.danger', value: '#3' },
    ],
  });
});

it('n ajoute pas de section historique quand la palette n en porte plus', () => {
  const sections = buildSections({ light: { text: { a: '#1' } } });

  expect(sections.every(s => !s.deprecated)).toBe(true);
});

// Une palette sans mode clair n'est pas une erreur : c'est ce que rend un theme partiel, et
// l'ecran doit alors montrer une page vide plutot que casser.
it('rend une liste vide pour une palette sans mode clair', () => {
  expect(buildSections({})).toEqual([]);
});

it('compte au singulier une section d un seul jeton', () => {
  expect(compteDeJetons({ title: 'light / border', entries: [{ path: 'a', value: '#1' }] })).toBe('1 token');
});

it('compte au pluriel une section de plusieurs jetons', () => {
  const entries = [
    { path: 'a', value: '#1' },
    { path: 'b', value: '#2' },
  ];

  expect(compteDeJetons({ title: 'light / text', entries })).toBe('2 tokens');
});

// Les familles s'ouvrent, l'historique reste replie : c'est ce qui reste a migrer, pas ce
// qu'on vient consulter.
it('ouvre les familles au depart et laisse l historique replie', () => {
  const sections = buildSections({ light: { text: { a: '#1' } }, primary: '#2' });

  expect(sectionsOuvertesAuDepart(sections)).toEqual(['light / text']);
});
