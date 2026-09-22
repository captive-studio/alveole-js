import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { ActionMenuItem } from './ActionMenuItem';

// Une entree de menu declenche une action : c'est un bouton. Le navigateur ne transforme Entree
// et Espace en clic que sur un vrai element <button>, et jsdom ne simule pas cette conversion :
// on epingle donc la balise qui la garantit, comme pour SidebarItem et Button.
test("rend l'entree de menu en element button natif", () => {
  const { getByRole } = renderOnDesktop(<ActionMenuItem title="Porte ouverte" onPress={() => undefined} />);

  expect(getByRole('button', { name: 'Porte ouverte' }).tagName).toBe('BUTTON');
});
