// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderOnDesktop, renderOnMobile } from '@/__tests__/helpers/render.web';
import { Sidebar } from './Sidebar';

test("n'affiche pas d'en-tête quand la barre latérale n'a pas de logo", () => {
  const { container } = renderOnDesktop(<Sidebar logo={null} />);

  expect(container.querySelector('sidebar-header')).toBeNull();
});

// axe exige que tout le contenu d'une page soit dans un repère (règle `region`). Le
// conteneur était un `<sidebar>`, élément que HTML n'a jamais standardisé : le navigateur en
// fait un élément inconnu, sans aucune sémantique de repère.
//
// Poser `role="navigation"` ne suffit pas : react-native-web ne le rend pas en attribut, il
// le traduit en élément `<nav>`, traduction que le `tag` écrase. Le rôle est alors consommé
// puis perdu, et le DOM servi n'a plus rien. D'où `tag="nav"`, seule forme qui survit.
test('expose la barre latérale comme un repère de navigation', () => {
  const { container } = renderOnDesktop(<Sidebar />);

  expect(container.querySelector('nav')).not.toBeNull();
});

// Le tiroir mobile porte la même navigation : le repère ne peut pas dépendre de la largeur
// de l'écran, sans quoi la règle `region` retombe dès que la fenêtre rétrécit.
test('expose aussi le tiroir mobile comme un repère de navigation', () => {
  const { container } = renderOnMobile(<Sidebar />);

  expect(container.querySelector('nav')).not.toBeNull();
});
