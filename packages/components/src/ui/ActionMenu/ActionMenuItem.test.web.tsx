import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { ActionMenuItem } from './ActionMenuItem';

// Une entree de menu declenche une action : c'est un bouton. Le navigateur ne transforme Entree
// et Espace en clic que sur un vrai element <button>, et jsdom ne simule pas cette conversion :
// on epingle donc la balise qui la garantit, comme pour SidebarItem et Button.
test("rend l'entree de menu en element button natif", () => {
  const { getByRole } = renderOnDesktop(<ActionMenuItem title="Porte ouverte" onPress={() => undefined} />);

  expect(getByRole('button', { name: 'Porte ouverte' }).tagName).toBe('BUTTON');
});

// une clause ne vit que sur la prop qui porte le repos (ADR 0031) : le fond de l'entree
// selectionnee et celui du survol vivent sur la seule prop `backgroundColor`.
test("ne pose pas le fond de l'entree selectionnee en inline", () => {
  const { container } = renderOnDesktop(<ActionMenuItem title="Copier" selected />);
  const item = elementDuType(container.querySelector('sidebar-item'), HTMLElement);

  expect(item.style.backgroundColor).toBe('');
  expect(item.className).toMatch(/_b-/);
});
