/* global window */
require('./mocks/expo');
require('./mocks/safeArea');

// Le mock de `@alveole/theme` du projet natif n'est délibérément pas chargé ici : le
// helper de rendu web monte le vrai ThemeProvider. Voir __tests__/helpers/render.web.tsx.

// jsdom n'implémente pas matchMedia, dont Tamagui se sert pour résoudre ses media queries
// au premier rendu. Sans ce relais, toute suite web échoue avant le premier test.
window.matchMedia =
  window.matchMedia ||
  (query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
