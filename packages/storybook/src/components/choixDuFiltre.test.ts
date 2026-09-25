import { choixApres, libelleDuFiltre } from './choixDuFiltre';

// Reprendre l'option deja choisie annule le filtre : sans cela, on ne pourrait plus revenir a
// la liste entiere sans recharger la page.
it('annule le filtre quand on reprend l option deja choisie', () => {
  expect(choixApres('core', 'core')).toBeNull();
});

it('retient l option choisie quand elle n etait pas deja choisie', () => {
  expect(choixApres('core', 'ui')).toBe('ui');
});

const indicateurs = [
  { key: 'figma', label: 'Figma' },
  { key: 'web', label: 'Web only' },
];

// Le bouton porte le filtre actif plutot que son libelle generique : c'est la seule trace du
// filtre une fois le menu referme.
it('nomme le bouton d apres l option choisie', () => {
  expect(libelleDuFiltre({ libelle: 'Indicateurs', options: indicateurs, choisi: 'figma' })).toBe('Figma');
});

it('garde le libelle generique tant que rien n est choisi', () => {
  expect(libelleDuFiltre({ libelle: 'Indicateurs', options: indicateurs, choisi: null })).toBe('Indicateurs');
});
